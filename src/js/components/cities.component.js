'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import utils from './../utils/utils';
import {setCity} from './../actions/city.actions';

class Cities extends Component {
  handleChange(val) {
    this.props.dispatch(setCity(val));
  }
  
  render() {
    const options = utils.cities.map((city, index) => (
      {
        value: city.id,
        label: city.name
      }
    ));
    
    return (
      <div className="select-control">
        <Select
          clearable={false}
          name="cities"
          value={this.props.cityId}
          options={options}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}

Cities.propTypes = {
  cityId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect((state) => ({
  cityId: state.cityId
}))(Cities);
