'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import {selectChartConfig} from './../selectors/temperatures.selectors';
import Spinner from './spinner.component';

class Chart extends Component {
  render() {
    if ((!this.props.config.series || this.props.config.series.length === 0) && !this.props.isLoading) {
      return <h1>No data available</h1>;
    }
    
    return (
      <div>
        {!this.props.isLoading ? <ReactHighcharts config={this.props.config} ref="chart" /> : <Spinner />}
      </div>
    );
  }
}

Chart.propTypes = {
  config: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default connect(state => ({
  config: selectChartConfig(state),
  isLoading: state.temperatures.isLoading
}))(Chart);
