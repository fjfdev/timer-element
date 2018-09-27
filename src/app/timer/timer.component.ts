import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'custom-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TimerComponent implements OnDestroy {
  timerValue: string;
  timerInterval;
  isTimerRunning: boolean;

  constructor() {
    this.resetTimerValues();
  }

  ngOnDestroy() {
    this.stopInterval();
  }

  initTimer() {
    let secCount = 1;
    this.isTimerRunning = true;
    this.timerInterval = setInterval( () => {
      const seconds = secCount % 60;
      const minutes = Math.floor((secCount / 60)) % 60;
      const hours = Math.floor(Math.floor((secCount / 60)) / 60);

      const secondsStr = ('0' + seconds).slice(-2);
      const minutesStr = ('0' + minutes).slice(-2);
      const hoursStr = ('0' + hours).slice(-2);

      this.timerValue = `${hoursStr}:${minutesStr}:${secondsStr}`;
      secCount += 1;
    }, 1000);
  }

  resetTimerValues() {
    this.timerValue = '00:00:00';
    this.isTimerRunning = false;
  }

  stopInterval() {
    this.resetTimerValues();
    clearInterval(this.timerInterval);
  }

}
