'use strict';

import {
  TEMPERATURES_RECEIVE_SUCCESS,
  TEMPERATURES_RECEIVE_ERROR,
  TEMPERATURES_REQUEST
} from './actionTypes';
import Api from './../services/api.service';

const getTemperatues = () => (
  (dispatch, getState) => {
    dispatch(request());
    dispatch(retrieve());
  }
);

const retrieve = () => (
  (dispatch, getState) => {
    const state = getState();
    Api.getTemperature(state.month, state.yearsBack)
      .then(response => {
        dispatch(receiveSuccess(response));
      })
      .catch(err => {
        dispatch(receiveError(err));
      });
  }
);

const request = () => ({
  type: TEMPERATURES_REQUEST
});

const receiveSuccess = (data) => ({
  type: TEMPERATURES_RECEIVE_SUCCESS,
  payload: data
});

const receiveError = (err) => ({
  type: TEMPERATURES_RECEIVE_ERROR
});

export {
  getTemperatues
};
