import React from 'react'
import { shallow } from 'enzyme'
import MovieDetail from '../components/MovieDetail';

describe('Layout component', () => {
  test('should render movie-detail', () => {
    const wrapper = shallow(<MovieDetail />);
    expect(wrapper.find('#movie-detail').length).toBe(1);
  });
});
