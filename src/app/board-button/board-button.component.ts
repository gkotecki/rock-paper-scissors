import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { GameOption } from 'src/shared/services/game.service';

const animation = {
  shrink: { 'max-width': 0, 'max-height': 0, opacity: 0 },
  default: { 'max-width': 'var(--btn-size)', 'max-height': 'var(--btn-size)', opacity: 1 },
};

@Component({
  selector: 'board-button',
  templateUrl: './board-button.component.html',
  styleUrls: ['./board-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [style(animation.shrink), animate('0.2s', style(animation.default))]),
      transition(':leave', [style(animation.default), animate('0.2s', style(animation.shrink))]),
    ]),
  ],
})
export class BoardButtonComponent {
  /**
   * Game option type
   */
  @Input()
  @HostBinding('class')
  public type: GameOption = null;

  /**
   * Whether current button is a winner
   */
  @Input()
  @HostBinding('class.winner')
  public winner = false;

  /**
   * Binds lifecycle animation to host
   */
  @HostBinding('@inOutAnimation')
  private slideIn = true;

  /**
   * Returns img source from type
   */
  public get imgSrc() {
    return `assets/icon-${this.type}.svg`;
  }
}
