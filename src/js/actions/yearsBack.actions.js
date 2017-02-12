'use strict';

import {
  YEARS_BACK_SET
} from './actionTypes';

const setYearsBack = (yearsBack) => ({
  type: YEARS_BACK_SET,
  payload: yearsBack
});

export {
  setYearsBack
};
