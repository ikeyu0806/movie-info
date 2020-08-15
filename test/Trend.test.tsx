import React from 'react'
import { shallow } from 'enzyme'
import Showing from '../components/Showing'

describe('Showing component', () => {
  test('should render columns', () => {
    const wrapper = shallow(<Showing />);
    expect(wrapper.find('.columns').length).toBe(1);
  });
});
