import React from 'react'
import { shallow } from 'enzyme'
import SubmitButton from '../components/SubmitButton';

describe('Layout component', () => {
  test('should render movie-detail', () => {
    function handleClick() {
      console.log('OnClick test');
    }
    const wrapper = shallow(<SubmitButton onClick={handleClick} disabled={false}></SubmitButton>);
    expect(wrapper.find('button').length).toBe(1);
  });
});
