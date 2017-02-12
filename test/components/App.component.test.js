'use strict';

import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import {App} from './../../src/js/components/App.component';

describe('<App />', () => {
  let wrapper;
  let renderSpy;
  let mocks;
  
  beforeEach(() => {
    mocks = {
      props: {
        dispatch: () => (false),
        children: {}
      },
    };
    renderSpy = sinon.spy(App.prototype, 'render');
    wrapper = shallow(
      <App {...mocks.props} />
    );
  });
  
  afterEach(() => {
    renderSpy.restore();
    wrapper.unmount();
  });
  
  it('calls the render method', () => {
    expect(renderSpy.calledOnce).to.be.true;
  });
});
