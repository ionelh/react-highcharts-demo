'use strict';

import {combineReducers} from 'redux';
import temperatures from './temperatures.reducer';
import month from './month.reducer';
import cityId from './cityId.reducer';
import yearsBack from './yearsBack.reducer';

const combinedReducers = combineReducers({
  cityId,
  temperatures,
  month,
  yearsBack
});

export default combinedReducers;
