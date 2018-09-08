/* eslint-disable no-undef */
import React from 'react';
import Enzyme from 'enzyme';

import PlusButton from '../PlusButton';

describe('Testing ToggleButton component', () => {
  it('renders as expected', () => {
    const wrapper = Enzyme.shallow(
      <PlusButton
        onPress={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
