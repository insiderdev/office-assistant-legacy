
/* eslint-disable no-undef */
import React from 'react';
import Enzyme from 'enzyme';

import NotificationCard from '../NotificationCard';

describe('Testing ToggleButton component', () => {
  it('renders as expected', () => {
    const wrapper = Enzyme.shallow(
      <NotificationCard
        name="Test Name"
        done={10}
        total={20}
        nextNotificationSeconds={300}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
