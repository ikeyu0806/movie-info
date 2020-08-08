import React from 'react'
import { shallow } from 'enzyme'
import Trend from '../components/Trend'

describe('Trend component', () => {
  test('should render columns', () => {
    const wrapper = shallow(<Trend />);
    expect(wrapper.find('.columns').length).toBe(1);
  });
});
