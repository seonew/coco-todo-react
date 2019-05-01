import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  donutchartTrack : {
    fill: 'transparent',
    stroke: '#DAE2E5',
    strokeWidth: '5'
  },
  donutchartIndicator : {
    fill: 'transparent',
    stroke: '#00bcd4',
    strokeWidth: '5',
    strokeDasharray: '0 10000',
    transition: 'strokeDasharray .3s ease',
  },
  donutchart : {
    margin: '0 auto',
    borderRadius: '50%',
    display: 'block'
  },
  donutchartText : {
    fontFamily: 'Roboto',
    fill: '#607580'
  },
  donutchartTextVal : {
    fontSize: '13px',
  },
  donutchartTextPercent : {
    fontSize: '9px'
  }
});


class DonutChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 40,
      strokewidth: 5
    }
  }

  render() {
    const { classes, value } = this.props;

    const halfsize = (this.state.size * 0.5);
    const radius = halfsize - (this.state.strokewidth * 0.5);
    const circumference = 2 * Math.PI * radius;
    const strokeval = ((value * circumference) / 100);
    const dashval = (strokeval + ' ' + circumference);

    const trackstyle = {strokeWidth: this.state.strokewidth};
    const indicatorstyle = {strokeWidth: this.state.strokewidth, strokeDasharray: dashval}
    const rotateval = 'rotate(-90 '+halfsize+','+halfsize+')';

    return (
      <svg width={this.state.size} height={this.state.size} className={classes.donutchart}>
        <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className={classes.donutchartTrack}/>
        <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className={classes.donutchartIndicator}/>
        <text className={classes.donutchartText} x={halfsize} y={halfsize+5} style={{textAnchor:'middle'}} >
          <tspan className={classes.donutchartTextVal}>{value}</tspan>
          <tspan className={classes.donutchartTextPercent}>%</tspan>
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

export default withStyles(styles)(DonutChart);