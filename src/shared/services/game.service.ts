import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, map, startWith } from 'rxjs';

export const buttonOptions = ['rock', 'paper', 'scissors', 'lizard', 'spock'] as const;

export type GameOption = typeof buttonOptions[number];

@Injectable({ providedIn: 'root' })
export class GameService {
  public countControl = new FormControl(3);

  public availableOptions$ = this.countControl.valueChanges.pipe(
    startWith(this.countControl.value),
    map((count) => {
      return buttonOptions.slice(0, count);
    }),
  );

  public score$ = new BehaviorSubject(0);

  constructor() {}
}
