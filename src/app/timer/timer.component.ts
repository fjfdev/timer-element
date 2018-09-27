import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { select as d3Select } from 'd3-selection';

@Component({
  selector: 'custom-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TimerComponent implements OnInit, OnDestroy {
  timerValue: string;
  timerInterval;
  isTimerRunning: boolean;
  secCanvas: HTMLCanvasElement;
  ctx;

  constructor() {
  }

  ngOnInit() {
    this.resetTimerValues();
    this.initWidget();
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

  initWidget() {
    /*const element = d3Select('#seconds-widget');
    const parentSize = element.node().getBoundingClientRect();
    console.log(parentSize)*/
    this.secCanvas = <HTMLCanvasElement> document.getElementById('seconds-widget');
    this.ctx = this.secCanvas.getContext('2d');

    const xCenter = this.secCanvas.width / 2;
    const yCenter = (this.secCanvas.offsetTop + this.secCanvas.height) / 2;

    this.drawCirle(xCenter, yCenter, 50, 0, 2 * Math.PI, 'fill', '#000000');

    const clockSlide = (2 * Math.PI) / 240;
    let secondPosition = 0;
    setInterval(() => {
      this.drawCirle(xCenter, yCenter, 45, 0, secondPosition, 'stroke', '#8BDC2C', 10);
      secondPosition += clockSlide;
      if (secondPosition > 2 * Math.PI) {
        this.drawCirle(xCenter, yCenter, 50, 0, secondPosition, 'fill', '#000000', 10);
        secondPosition = 0;
      }
    }, 250);
  }

  drawCirle(x, y, radius, startAngle, endAngle, type, color, strokeWidth?) {
    if (type === 'fill') {
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.ctx.arc(x, y, radius, startAngle, endAngle);
      this.ctx.fill();
    }
    else if (type === 'stroke') {
      this.ctx.beginPath();
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = strokeWidth;

      this.ctx.arc(x, y, radius, startAngle, endAngle);
      this.ctx.stroke();
    }
  }



}
