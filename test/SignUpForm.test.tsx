import React from 'react'
import { shallow } from 'enzyme'
import SignUpForm from '../components/SignUpForm'

describe('Layout component', () => {
  test('should render h1', () => {
    const wrapper = shallow(<SignUpForm />);
    expect(wrapper.find('h1').length).toBe(1);
  });
});
