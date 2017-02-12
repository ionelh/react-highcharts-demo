'use strict';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory, browserHistory, IndexRoute} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import App from './js/components/app.component';
import combinedReducers from './js/reducers/combinedReducers';

import './sass/styles.sass';

const store = createStore(
  combinedReducers,
  applyMiddleware(thunk)
);

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('container')
);
