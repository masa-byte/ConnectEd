import { Component, Input } from '@angular/core';
import { Subject, Subscription, interval, takeUntil, takeWhile } from 'rxjs';
import { CountdownTimerService } from './countdown-timer.service';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent {
  private unsubscribeSubject = new Subject();

  private readonly MinutesInAnHour = 60;
  private readonly SecondsInAMinute = 60;

  constructor(private countdownTimerService: CountdownTimerService) { }

  @Input() inputTimeInMinutes!: number;
  totalSecondsLeft!: number;
  secondsLeftToDisplay!: number;
  minutesLeftToDisplay!: number;

  private changeTimerState() {
    if (this.totalSecondsLeft < 0) return;
    this.secondsLeftToDisplay = this.getSecondsLeftToDisplay(
      this.totalSecondsLeft
    );
    this.minutesLeftToDisplay = this.getMinutesLeftToDisplay(
      this.totalSecondsLeft
    );
  }

  private getSecondsLeftToDisplay(totalSecondsLeft: number) {
    return Math.floor(totalSecondsLeft % this.SecondsInAMinute);
  }

  private getMinutesLeftToDisplay(totalSecondsLeft: number) {
    return Math.floor(
      (totalSecondsLeft / this.SecondsInAMinute) % this.MinutesInAnHour
    );
  }

  ngOnInit() {
    this.totalSecondsLeft = this.inputTimeInMinutes * this.SecondsInAMinute;
    interval(1000)
      .pipe(
        takeUntil(this.unsubscribeSubject),
        takeWhile((_) => this.totalSecondsLeft >= 0)
      )
      .subscribe((_) => {
        this.changeTimerState();
        this.countdownTimerService.countSubject.next(this.totalSecondsLeft);
        this.totalSecondsLeft--;
      });
  }

  ngOnDestroy() {
    this.unsubscribeSubject.next(null);
    this.unsubscribeSubject.complete();
  }
}
