import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameService } from 'src/shared/services/game.service';

@Component({
  selector: 'game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameStatusComponent {
  constructor(public game: GameService) {}
}
