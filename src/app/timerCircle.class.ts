import * as d3 from 'd3';
import { Arc, Path } from 'd3';

export class TimerCircle {
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  cornerRadius: number;
  fillColor: string;
  timeValue?: number;
  path?: Selection;
  arc?: Arc<any, any>;

  constructor(circleMaxRadius,
              lineWidth,
              startAngle,
              endAngle,
              cornerRadius,
              fillColor,
              timeValue?,
              path?,
              arc?) {
    this.innerRadius = circleMaxRadius - lineWidth;
    this.outerRadius = circleMaxRadius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.cornerRadius = cornerRadius;
    this.fillColor = fillColor;
    this.timeValue = timeValue ? timeValue : 0;
    this.path = path ? path : null;
    this.arc = arc ? arc : null;
  }

  appendPathToSvg(svg) {
    const centerX = svg.node().getBoundingClientRect().width / 2;
    const centerY = svg.node().getBoundingClientRect().height / 2;

    console.log(centerX, centerY);
    this.path = svg.append('path').attr('transform', `translate(${centerX}, ${centerY})`);
  }

  updateArc(startAngle, endAngle) {
    this.startAngle = startAngle;
    this.endAngle = endAngle;

    this.arc = d3.arc()
      .startAngle(startAngle)
      .endAngle(endAngle)
      .innerRadius(this.innerRadius)
      .outerRadius(this.outerRadius)
      .startAngle(this.startAngle)
      .endAngle(this.endAngle)
      .cornerRadius(this.cornerRadius);

  }

  drawArc() {
    this.path
      // @ts-ignore
      .attr('d', this.arc)
      .attr('fill', this.fillColor)
      .attr('stroke', this.fillColor);
  }
}
