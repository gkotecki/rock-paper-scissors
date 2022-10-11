import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BoardButtonComponent } from './board-button/board-button.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { RangeInputComponent } from './range-input/range-input.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardButtonComponent,
    GameBoardComponent,
    RangeInputComponent,
    ScoreboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
