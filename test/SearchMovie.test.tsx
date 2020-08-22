import React from 'react'
import { shallow } from 'enzyme'
import SearchMovie from '../components/SearchMovie';


describe('Layout component', () => {
  test('should render table', () => {
    const wrapper = shallow(<SearchMovie />);
    expect(wrapper.find('table').length).toBe(1);
  });
});
