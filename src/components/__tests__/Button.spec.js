/* eslint-disable no-undef */
import React from 'react';
import Enzyme from 'enzyme';

import Button from '../Button';

describe('Testing ToggleButton component', () => {
  it('renders as expected', () => {
    const wrapper = Enzyme.shallow(
      <Button
        label="Hello"
        onPress={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
