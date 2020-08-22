import React from 'react'
import { shallow } from 'enzyme'
import UserInfo from '../components/UserInfo'

describe('Layout component', () => {
  test('should render h1', () => {
    const wrapper = shallow(<UserInfo />);
    expect(wrapper.find('h1').length).toBe(1);
  });
});
