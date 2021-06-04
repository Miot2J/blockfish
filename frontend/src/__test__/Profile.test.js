import React from 'react';
import { mount } from 'enzyme';
import Profile from './Profile';
import Counter from './Counter';

describe('<Profile />', () => {
  it('matches snapshot', () => {
    const wrapper = mount(<Profile username="velopert" name="김민준" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders username and name', () => {
    const wrapper = mount(<Profile username="velopert" name="김민준" />);

    expect(wrapper.props().username).toBe('velopert');
    expect(wrapper.props().name).toBe('김민준');
  });

  it('increases', () => {
    const wrapper = mount(<Counter />);
    const plusButton = wrapper.findWhere(
      (node) => node.type() === 'button' && node.text() === '+1',
    );
    plusButton.simulate('click');
    plusButton.simulate('click');

    const number = wrapper.find('h2');

    expect(number.text()).toBe('2');
  });
  it('decreases', () => {
    const wrapper = mount(<Counter />);
    const decreaseButton = wrapper.findWhere(
      (node) => node.type() === 'button' && node.text() === '-1',
    );
    decreaseButton.simulate('click');
    decreaseButton.simulate('click');

    const number = wrapper.find('h2');

    expect(number.text()).toBe('-2');
  });
});
