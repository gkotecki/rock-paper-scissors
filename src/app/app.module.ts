import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BoardButtonComponent } from './board-button/board-button.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { RangeInputComponent } from './range-input/range-input.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { GameStatusComponent } from './game-status/game-status.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardButtonComponent,
    GameBoardComponent,
    RangeInputComponent,
    ScoreboardComponent,
    GameStatusComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
