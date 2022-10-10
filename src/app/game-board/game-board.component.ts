import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
