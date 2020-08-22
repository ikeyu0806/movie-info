import React from 'react'
import { shallow } from 'enzyme'
import MoviePoster from '../components/MoviePoster';

describe('Layout component', () => {
  test('should render movie-detail', () => {
    const wrapper = shallow(<MoviePoster movie={{id: 1, title: "movie", poster_path: "https://example"}}></MoviePoster>);
    expect(wrapper.find('.column').length).toBe(1);
  });
});
