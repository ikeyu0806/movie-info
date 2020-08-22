import React from 'react'
import { shallow } from 'enzyme'
import LoginForm from '../components/LoginForm'

describe('Layout component', () => {
  test('should render h1', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find('h1').length).toBe(1);
  });
});
