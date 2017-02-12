'use strict';

import {
  TEMPERATURES_RECEIVE_SUCCESS,
  TEMPERATURES_REQUEST
} from './../actions/actionTypes';

const DEFAULT_STATE = {
  data: [
    {
      metadata: {},
      results: []
    }
  ],
  isLoading: false
};

function temperatures(state = DEFAULT_STATE, action) {
  switch (action.type) {
    // TODO Handle error action
    
    case TEMPERATURES_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    
    case TEMPERATURES_RECEIVE_SUCCESS:
      return Object.assign({}, state, {
        data: action.payload,
        isLoading: false
      });
    
    default:
      return state;
  }
}

export default temperatures;
