import React from 'react'
import { shallow } from 'enzyme'
import Popular from '../components/Popular'

describe('Layout component', () => {
  test('should render columns', () => {
    const wrapper = shallow(<Popular />);
    expect(wrapper.find('.columns').length).toBe(1);
  });
});
