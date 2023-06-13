import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
  private enableBackground: boolean = true;

  constructor() {}

  getBackgroundStatus(): boolean {
    return this.enableBackground;
  }

  setBackgroundStatus(value: boolean): void {
    this.enableBackground = value;
  }
}
