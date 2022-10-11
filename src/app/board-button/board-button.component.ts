import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { GameOption } from 'src/shared/services/game.service';

@Component({
  selector: 'board-button',
  templateUrl: './board-button.component.html',
  styleUrls: ['./board-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardButtonComponent {
  @Input()
  @HostBinding('class')
  public type: GameOption = null;

  get imgSrc() {
    return `assets/icon-${this.type}.svg`;
  }
}
