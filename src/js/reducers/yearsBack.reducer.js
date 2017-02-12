'use strict';

import {
  YEARS_BACK_SET
} from './../actions/actionTypes';

const DEFAULT_STATE = 5;

function yearsBack(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case YEARS_BACK_SET:
      return action.payload;
    
    default:
      return state;
  }
}

export default yearsBack;
