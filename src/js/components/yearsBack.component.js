'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import utils from './../utils/utils';
import {setYearsBack} from './../actions/yearsBack.actions';

class YearsBack extends Component {
  handleChange(e) {
    this.props.dispatch(setYearsBack(parseInt(e.target.value)));
  }
  
  render() {
    const jsx = [];
    
    // With the free version of this API I can only make 5 requests / second, so limiting to 5
    for (let index = 1; index <= 5; index += 1) {
      jsx.push(
        <option label={index} value={index} key={index} />
      );
    }
    
    return (
      <select onChange={this.handleChange.bind(this)} value={this.props.yearsBack}>
        {jsx}
      </select>
    );
  }
}

YearsBack.propTypes = {
  dispatch: PropTypes.func.isRequired,
  yearsBack: PropTypes.number.isRequired
};

export default connect((state) => ({
  yearsBack: state.yearsBack
}))(YearsBack);
