import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../components/Layout';


describe('view', () => {
  test('Layout component', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.find('Head').length).toBe(1);
  });
});
