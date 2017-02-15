'use strict';

import {
  CITY_SET
} from './actionTypes';

const setCity = (cityId) => ({
  type: CITY_SET,
  payload: cityId
});

export {
  setCity
};
