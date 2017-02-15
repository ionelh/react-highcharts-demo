'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import utils from './../utils/utils';
import {setYearsBack} from './../actions/yearsBack.actions';
import Select from 'react-select';

class YearsBack extends Component {
  handleChange(value) {
    this.props.dispatch(setYearsBack(parseInt(value)));
  }
  
  render() {
    const options = [];
    for (let index = 1; index <= 5; index += 1) {
      options.push({
        value: index,
        label: index
      });
    }
    
    return (
      <div className="select-control">
        <Select
          clearable={false}
          searchable={false}
          name="yearsBack"
          value={this.props.yearsBack}
          options={options}
          onChange={this.handleChange.bind(this)}
        />
      </div>
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
