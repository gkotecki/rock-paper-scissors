import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, map, startWith, tap } from 'rxjs';

/**
 * Available game options
 */
const buttonOptions = ['rock', 'paper', 'scissors', 'lizard', 'spock'] as const;

/**
 * Inferred game option type
 */
export type GameOption = typeof buttonOptions[number];

/**
 * Game state options
 */
export enum GameState {
  player1Turn,
  player2Turn,
  gameResult,
}

/**
 * Match winning condition map
 */
const winConditions = {
  rock:     ['crushes Lizard',   'crushes Scissors'  ],
  paper:    ['covers Rock',      'disproves Spock'   ],
  scissors: ['cuts Paper',       'decapitates Lizard'],
  lizard:   ['poisons Spock',    'eats Paper'        ],
  spock:    ['smashes Scissors', 'vaporizes Rock'    ],
};

/**
 * Game logic service
 */
@Injectable({ providedIn: 'root' })
export class GameService {
  /**
   * Selected options controller
   */
  public selectedOptions = new FormGroup({
    player1: new FormControl<GameOption>(null),
    player2: new FormControl<GameOption>(null),
  });

  /**
   * Selected options count controller
   */
  public countControl = new FormControl(3);

  /**
   * Available options observable
   */
  public availableOptions$ = this.countControl.valueChanges.pipe(
    startWith(this.countControl.value),
    map((count) => buttonOptions.slice(0, count)),
  );

  /**
   * Game score controller
   */
  public score$ = new BehaviorSubject([0, 0]);

  /**
   * Current match state controller
   */
  public state$ = new BehaviorSubject(GameState.player1Turn);

  /**
   * Winner data state controller
   */
  public winnerData$ = new BehaviorSubject<{
    playerIndex: number;
    option: GameOption;
    text: string;
  }>(null);

  constructor() {
    this.initializeStateListener();
  }

  /**
   * Handles game state changes
   */
  private initializeStateListener() {
    this.state$
      .pipe(
        tap((state) => {
          if (state === GameState.gameResult) {
            const [playerIndex, option, text] = this.getWinner();
            this.winnerData$.next({ playerIndex, option, text });
          } else {
            this.winnerData$.next(null);
          }
        })
      )
      .subscribe();
  }

  /**
   * Parses match conditions and returns winner data
   */
  private getWinner(): [number, GameOption, string] {
    const { player1, player2 } = this.selectedOptions.value;

    if (player1 === player2) {
      return [null, null, 'Draw!'];
    }

    const getVictoryText = (keys: GameOption[]) =>
      winConditions[keys[0]].find((winText) => winText.toLowerCase().includes(keys[1]));

    const player1VictoryText = getVictoryText([player1, player2]);
    const score = this.score$.value;

    if (player1VictoryText) {
      this.score$.next([++score[0], score[1]]);
      return [1, player1, player1VictoryText];
    } else {
      this.score$.next([score[0], ++score[1]]);
      return [2, player2, getVictoryText([player2, player1])];
    }
  }
}
