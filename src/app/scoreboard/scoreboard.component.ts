import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameService } from 'src/shared/services/game.service';

@Component({
  selector: 'scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreboardComponent {
  constructor(public game: GameService) {}
}
