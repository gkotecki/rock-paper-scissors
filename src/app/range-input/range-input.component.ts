import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameService } from 'src/shared/services/game.service';

@Component({
  selector: 'range-input',
  templateUrl: './range-input.component.html',
  styleUrls: ['./range-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeInputComponent {
  constructor(public game: GameService) {}
}
