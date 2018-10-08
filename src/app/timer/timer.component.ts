import { TimerCircle } from '../timerCircle.class';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'custom-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TimerComponent implements OnInit, OnDestroy {
  @Output() timerValueUpdated = new EventEmitter<string>();

  timerValue: string;
  timerInterval;
  isTimerRunning: boolean;
  pi: number;
  svg: Selection;
  secondsCircle: TimerCircle;
  minutesCircle: TimerCircle;
  hoursCircle: TimerCircle;
  graphSizes;

  constructor() {
    this.pi = Math.PI;
  }

  ngOnInit() {
    this.initGraphSizes();
    this.initGraphics();
    this.resetTimerValues();
  }

  ngOnDestroy() {
    this.stopInterval();
  }

  initGraphSizes() {
    const numberOfCircles = 3;
    const containerWidth = d3.select('#d3-widget').node().getBoundingClientRect().width;
    const svgWidth = containerWidth / 2;
    const circleMaxSize = (svgWidth / 2) * 0.75;
    const lineSize = circleMaxSize / (numberOfCircles + 1);
    const circleMargin = 5;

    this.graphSizes = {
      containerWidth: containerWidth,
      svgWidth: svgWidth,
      circleMaxSize: circleMaxSize,
      lineSize: lineSize,
      circleMargin : circleMargin,
      secondsMaxRadius: circleMaxSize,
      minutesMaxRadius: circleMaxSize - lineSize - circleMargin,
      hoursMaxRadius: circleMaxSize - circleMargin * 2 - lineSize * 2,
    };
  }

  initGraphics() {
    this.initSvg();
    this.initSeconds();
    this.initMinutes();
    this.initHours();
  }

  initSvg() {
    this.svg = d3.select('#d3-widget')
      .append('svg')
      .attr('width', this.graphSizes.svgWidth)
      .attr('height', this.graphSizes.svgWidth);
  }

  initSeconds() {
    const background = new TimerCircle(
      this.graphSizes.secondsMaxRadius,
      this.graphSizes.lineSize,
      0,
      2 * this.pi,
      30,
      '#55222C',
      this.svg);

    this.secondsCircle = new TimerCircle(
      this.graphSizes.secondsMaxRadius,
      this.graphSizes.lineSize,
      0,
      0,
      30,
      '#E91039',
      this.svg);

    background.drawArc();
    this.secondsCircle.drawArc();
  }

  initMinutes() {
    const background = new TimerCircle(
      this.graphSizes.minutesMaxRadius,
      this.graphSizes.lineSize,
      0,
      2 * this.pi,
      30,
      '#435A22',
      this.svg);

    this.minutesCircle = new TimerCircle(
      this.graphSizes.minutesMaxRadius,
      this.graphSizes.lineSize,
      0,
      0,
      30,
      '#A0FF00',
      this.svg);

    background.drawArc();
    this.minutesCircle.drawArc();
  }

  initHours() {
    const background = new TimerCircle(
      this.graphSizes.hoursMaxRadius,
      this.graphSizes.lineSize,
      0,
      2 * this.pi,
      30,
      '#265052',
      this.svg);

    this.hoursCircle = new TimerCircle(
      this.graphSizes.hoursMaxRadius,
      this.graphSizes.lineSize,
      0,
      0,
      30,
      '#19D5DE',
      this.svg);

    background.drawArc();
    this.hoursCircle.drawArc();
  }

  initTimer() {
    let secCount = 1;
    this.isTimerRunning = true;
    this.timerInterval = setInterval( () => {
      const seconds = secCount % 60;
      const minutes = Math.floor((secCount / 60)) % 60;
      const hours = Math.floor(Math.floor((secCount / 60)) / 60) % 12;

      this.updateTimerValue(hours, minutes, seconds);
      this.updateSecondsCircle(seconds);
      this.updateMinutesCircle(minutes);
      this.updateHoursCircle(hours);

      this.timerValueUpdated.emit(this.timerValue);

      secCount += 1;
    }, 1000);
  }

  updateSecondsCircle(secondsValue) {
    const secSlice = (2 * this.pi) / 60;
    this.secondsCircle.updateArc(0, secSlice * secondsValue);
    this.secondsCircle.drawArc();
  }

  updateMinutesCircle(minutesValue) {
    const minutesSlice = (2 * this.pi) / 60;
    this.minutesCircle.updateArc(0, minutesSlice * minutesValue);
    this.minutesCircle.drawArc();
  }

  updateHoursCircle(hoursValue) {
    const hoursSlice = (2 * this.pi) / 12;
    this.hoursCircle.updateArc(0, hoursSlice * hoursValue);
    this.hoursCircle.drawArc();
  }

  updateTimerValue(hours, minutes, seconds) {
    const secondsStr = ('0' + seconds).slice(-2);
    const minutesStr = ('0' + minutes).slice(-2);
    const hoursStr = ('0' + hours).slice(-2);

    this.timerValue = `${hoursStr}:${minutesStr}:${secondsStr}`;
  }

  resetTimerValues() {
    this.updateTimerValue(0, 0, 0);
    this.isTimerRunning = false;
  }

  stopInterval() {
    this.resetTimerValues();
    clearInterval(this.timerInterval);
  }

}
