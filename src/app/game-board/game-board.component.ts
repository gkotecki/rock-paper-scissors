import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameService } from 'src/shared/services/game.service';

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
}
