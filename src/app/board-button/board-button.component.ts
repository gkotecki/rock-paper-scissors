import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'board-button',
  templateUrl: './board-button.component.html',
  styleUrls: ['./board-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardButtonComponent {
  @Input()
  @HostBinding('class')
  public type: 'rock' | 'paper' | 'scissors' | undefined = null;

  get imgSrc() {
    return {
      rock: 'assets/icon-rock.svg',
      paper: 'assets/icon-paper.svg',
      scissors: 'assets/icon-scissors.svg',
    }[this.type];
  }
}
