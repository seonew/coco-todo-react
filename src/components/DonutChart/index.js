import React from 'react';
import PropTypes from 'prop-types';

class DonutChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 75,
      size: 38,
      strokewidth: 5
    }
  }

  render() {
    const halfsize = (this.state.size * 0.5);
    const radius = halfsize - (this.state.strokewidth * 0.5);
    const circumference = 2 * Math.PI * radius;
    const strokeval = ((this.state.value * circumference) / 100);
    const dashval = (strokeval + ' ' + circumference);

    const trackstyle = {strokeWidth: this.state.strokewidth};
    const indicatorstyle = {strokeWidth: this.state.strokewidth, strokeDasharray: dashval}
    const rotateval = 'rotate(-90 '+halfsize+','+halfsize+')';

    return (
      <svg width={this.state.size} height={this.state.size} className="donutchart">
        <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className="donutchart-track"/>
        <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="donutchart-indicator"/>
        <text className="donutchart-text" x={halfsize} y={halfsize+5} style={{textAnchor:'middle'}} >
          <tspan className="donutchart-text-val">{this.state.value}</tspan>
          <tspan className="donutchart-text-percent">%</tspan>
        </text>
      </svg>
    );
  }
}

DonutChart.propTypes = {
  value: PropTypes.number,        // value the chart should show
  size: PropTypes.number,         // diameter of chart
  strokewidth: PropTypes.number   // width of chart line
};

export default DonutChart;