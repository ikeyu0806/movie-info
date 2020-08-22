import React from 'react'
import { shallow } from 'enzyme'
import Home from '../components/Home'

describe('Layout component', () => {
  test('should render Showing', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('Showing').length).toBe(1);
  });

  test('should render Popular', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('Popular').length).toBe(1);
  });
});
