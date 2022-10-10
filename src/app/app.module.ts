import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { BoardButtonComponent } from './board-button/board-button.component';

@NgModule({
  declarations: [AppComponent, GameBoardComponent, BoardButtonComponent,  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
