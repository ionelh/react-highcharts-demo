'use strict';

import {
  MONTH_SET
} from './../actions/actionTypes';

const DEFAULT_STATE = 2;

function month(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case MONTH_SET:
      return action.payload;
    
    default:
      return state;
  }
}

export default month;
