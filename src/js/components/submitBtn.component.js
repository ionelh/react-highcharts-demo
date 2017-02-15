'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getTemperatues} from './../actions/temperatures.actions';

class SubmitBtn extends Component {
  handleClick(e) {
    this.props.dispatch(getTemperatues());
  }
  
  render() {
    return (
      <div className="select-control">
        <button onClick={this.handleClick.bind(this)}>Go!</button>
      </div>
    );
  }
}

SubmitBtn.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(SubmitBtn);
