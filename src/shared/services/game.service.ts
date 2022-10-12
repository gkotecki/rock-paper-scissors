import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, map, startWith, tap } from 'rxjs';

export const buttonOptions = ['rock', 'paper', 'scissors', 'lizard', 'spock'] as const;

export type GameOption = typeof buttonOptions[number];

export enum GameState {
  player1Turn,
  player2Turn,
  gameResult,
}

const winConditions = {
  rock:     ['crushes Lizard',   'crushes Scissors'  ],
  paper:    ['covers Rock',      'disproves Spock'   ],
  scissors: ['cuts Paper',       'decapitates Lizard'],
  lizard:   ['poisons Spock',    'eats Paper'        ],
  spock:    ['smashes Scissors', 'vaporizes Rock'    ],
};

@Injectable({ providedIn: 'root' })
export class GameService {
  public selectedOptions = new FormGroup({
    player1: new FormControl<GameOption>(null),
    player2: new FormControl<GameOption>(null),
  });

  public countControl = new FormControl(3);

  public availableOptions$ = this.countControl.valueChanges.pipe(
    startWith(this.countControl.value),
    map((count) => buttonOptions.slice(0, count)),
  );

  public score$ = new BehaviorSubject([0, 0]);

  public state$ = new BehaviorSubject(GameState.player1Turn);

  public winnerData$ = new BehaviorSubject<{
    playerIndex: number;
    option: GameOption;
    text: string;
  }>(null);

  constructor() {
    this.state$
      .pipe(
        tap((state) => {
          if (state === GameState.gameResult) {
            const [playerIndex, option, text] = this.getWinner();
            this.winnerData$.next({ playerIndex, option, text });
          } else {
            console.log('resetting winner')
            this.winnerData$.next(null);
          }
        }),
      )
      .subscribe();
  }

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
