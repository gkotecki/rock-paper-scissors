import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameOption, GameService, GameState } from 'src/shared/services/game.service';

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameBoardComponent {
  constructor(public game: GameService) {}

  getTransform(index: number) {
    const count = this.game.countControl.value;
    const degrees = (360 / count) * index + 90;
    const scale = 1 - (count - 3) * 0.1;
    return `
      rotate(${degrees}deg)
      translate(calc(var(--board-size) / 2))
      rotate(-${degrees}deg)
      scale(${scale})
    `;
  }

  selectOption(option: GameOption) {
    const { player1, player2 } = this.game.selectedOptions.controls;
    switch (this.game.state$.value) {
      case GameState.gameResult:
        player1.patchValue(option);
        player2.reset();
        this.game.state$.next(GameState.player2Turn);
        break;
      case GameState.player1Turn:
        player1.patchValue(option);
        this.game.state$.next(GameState.player2Turn);
        break;
      case GameState.player2Turn:
        player2.patchValue(option);
        this.game.state$.next(GameState.gameResult);
        break;
    }
  }
}
