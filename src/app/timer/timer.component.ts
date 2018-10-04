import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { TimerCircle } from '../timerCircle.class';
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
  pi = Math.PI;
  svg;
  backgroundCircles: Array<TimerCircle>;
  secondsCircle;
  minutesCircle;
  hoursCircle;

  constructor() {
  }

  ngOnInit() {
    this.resetTimerValues();
    const containerWidth = d3.select('#d3-widget').node().getBoundingClientRect().width;
    const svgWidth = containerWidth / 2;

    const circleMaxSize = (svgWidth / 2) * 0.75;
    const circleSlice = circleMaxSize / 4;
    const circleMargin = 5;

    this.svg = d3.select('#d3-widget')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgWidth);

    this.backgroundCircles = [
      new TimerCircle( circleMaxSize, circleSlice, 0, 2 * this.pi, 30, '#55222C'),
      new TimerCircle( circleMaxSize - circleSlice - circleMargin, circleSlice, 0, 2 * this.pi, 30, '#435A22'),
      new TimerCircle(circleMaxSize - circleMargin * 2 - circleSlice * 2, circleSlice, 0, 2 * this.pi, 30, '#265052'),
    ];

    this.secondsCircle = new TimerCircle( circleMaxSize, circleSlice, 0, 0, 30, '#E91039');
    this.minutesCircle = new TimerCircle( circleMaxSize - circleSlice - circleMargin, circleSlice, 0, 0, 30, '#A0FF00');
    this.hoursCircle = new TimerCircle( circleMaxSize - circleMargin * 2 - circleSlice * 2, circleSlice, 0, 0, 30, '#19D5DE');
  }

  ngOnDestroy() {
    this.stopInterval();
  }

  initTimer() {

    this.backgroundCircles.forEach( (circle: TimerCircle) => {
      circle.appendPathToSvg(this.svg);
    });

    [this.secondsCircle, this.minutesCircle, this.hoursCircle].forEach( (circle: TimerCircle) => {
      circle.appendPathToSvg(this.svg);
    });

    const secSlide = (2 * this.pi) / 60;
    let secPosition = secSlide;
    const secLimit = (2 * this.pi);
    let fillColor = '#E91039';


    this.backgroundCircles.forEach( (circle: TimerCircle) => {
      circle.updateArc(0, 2 * this.pi);
      circle.drawArc();
    });

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

      this.secondsCircle.updateArc(0, secSlide * seconds);

      this.minutesCircle.updateArc(0, secSlide * minutes);

      this.hoursCircle.updateArc(0, secSlide * hours);

      this.secondsCircle.drawArc();
      this.minutesCircle.drawArc();
      this.hoursCircle.drawArc();

      // const text = svg.append('text');
      // text.text( (d) => '1').attr('fill', 'white');


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
