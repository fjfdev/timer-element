import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'custom-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class TimerComponent implements OnDestroy {
  timerValue: string;
  timerInterval: number;

  constructor() {
    this.timerValue = '00:00:00';
  }

  ngOnDestroy() {
    this.stopInterval();
  }

  initTimer() {
    const initialTime = new Date().getTime();
    this.timerInterval = setInterval( () => {
      const currentTime = new Date().getTime();
      const miliSecondsDiff = currentTime - initialTime;
      const miliSecondsValue = Math.floor(miliSecondsDiff / 1000);

      const seconds = miliSecondsValue % 60;
      const minutes = Math.floor((miliSecondsValue / 60)) % 60;
      const hours = Math.floor((miliSecondsValue / 60) / 60);

      const secondsStr = ('0' + seconds).slice(-2);
      const minutesStr = ('0' + minutes).slice(-2);
      const hoursStr = ('0' + hours).slice(-2);

      this.timerValue = `${hoursStr}:${minutesStr}:${secondsStr}`;
    }, 1000);
  }

  stopInterval() {
    this.timerValue = '00:00:00';
    clearInterval(this.timerInterval);
  }

}
