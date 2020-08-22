import React from 'react'
import { shallow } from 'enzyme'
import Layout from '../components/Layout'

describe('Layout component', () => {
  test('should render Head', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.find('Head').length).toBe(1);
  });

  test('should render footer', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.find('footer').length).toBe(1);
  });
});
