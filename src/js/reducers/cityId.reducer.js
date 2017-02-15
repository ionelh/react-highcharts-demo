'use strict';

import {
  CITY_SET
} from './../actions/actionTypes';

const DEFAULT_STATE = 'CITY:RO000012';

function cityId(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case CITY_SET:
      return action.payload;
    
    default:
      return state;
  }
}

export default cityId;
