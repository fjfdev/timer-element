import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

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
  }

  ngOnDestroy() {
    this.stopInterval();
  }

  initTimer() {
    const svg = d3.select('#d3-widget')
      .append('svg')
      .attr('width', '400')
      .attr('height', '400');

    const secondsPath = svg
      .append('path')
      .attr('transform', 'translate(200,200)');

    const minutesPath = svg
      .append('path')
      .attr('transform', 'translate(200,200)');

    const hoursPath = svg
      .append('path')
      .attr('transform', 'translate(200,200)');

    const pi = Math.PI;
    const secSlide = (2 * pi) / 60;
    let secPosition = secSlide;
    const secLimit = (2 * pi);
    let fillColor = 'E91039';

    let secondsArc = this.createArc(100, 130, 0, secPosition, 30);
    let minutesArc = this.createArc(65, 95, 0, secPosition, 30);
    let hoursArc = this.createArc(30, 60, 0, secPosition, 30);

    this.drawArc(secondsPath, secondsArc, '#E91039');
    this.drawArc(minutesPath, minutesArc, '#A0FF00');
    this.drawArc(hoursPath, hoursArc, '#19D5DE');


    //
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
    //

      const resetClockNeeded: boolean = secPosition > secLimit;
      secPosition = resetClockNeeded ? 0 : secPosition + secSlide;
      fillColor = resetClockNeeded ? '#000000' : '#E91039';

      secondsArc = this.createArc(100, 130, 0, secSlide * seconds, 30);
      minutesArc = this.createArc(65, 95, 0, secSlide * minutes, 30);
      hoursArc = this.createArc(30, 60, 0, secSlide * hours, 30);

      this.drawArc(secondsPath, secondsArc, fillColor);
      this.drawArc(minutesPath, minutesArc, '#A0FF00');
      this.drawArc(hoursPath, hoursArc, '#19D5DE');

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

  private createArc(innerRadius, outerRadius, startAngle, endAngle, cornerRadius) {
    return d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(startAngle)
      .endAngle(endAngle)
      .cornerRadius(cornerRadius);
  }

  private drawArc(pathContainer, arc, color) {
    pathContainer
      .attr('d', arc)
      .attr('fill', color);
  }


}
