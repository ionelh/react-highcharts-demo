'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getTemperatues} from './../actions/temperatures.actions';
import Chart from './chart.component';
import Months from './months.component';
import Cities from './cities.component';
import YearsBack from './yearsBack.component';
import SubmitBtn from './submitBtn.component';

export class App extends Component {
  componentWillMount() {
    this.props.dispatch(getTemperatues());
  }
  
  render() {
    return (
      <div className="app-content">
        <small>
          This currently only shows temperatures for my current city, which is Cluj-Napoca, RO.
          <small>Note that I am using the free https://www.ncdc.noaa.gov/cdo-web/webservices/v2 APIs which are limited to 5 requests / second and 1000 requests / day.</small>
        </small>
        <div className="clearfix">
          <Months />
          <YearsBack />
          <Cities />
          <SubmitBtn />
        </div>
        <Chart />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(App);
