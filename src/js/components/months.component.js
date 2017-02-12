'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import utils from './../utils/utils';
import {setMonth} from './../actions/month.actions';

class Months extends Component {
  handleChange(e) {
    this.props.dispatch(setMonth(parseInt(e.target.value)));
  }
  
  render() {
    const months = utils.months.map((month, index) => (
      <option label={month} value={index + 1} key={index} />
    ));
    
    return (
      <select onChange={this.handleChange.bind(this)} value={this.props.month}>
        {months}
      </select>
    );
  }
}

Months.propTypes = {
  dispatch: PropTypes.func.isRequired,
  month: PropTypes.number.isRequired
};

export default connect((state) => ({
  month: state.month
}))(Months);
