'use strict';

import {
  MONTH_SET
} from './actionTypes';

const setMonth = (month) => ({
  type: MONTH_SET,
  payload: month
});

export {
  setMonth
};
