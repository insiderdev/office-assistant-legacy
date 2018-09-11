import { compose } from 'recompose';
import { connect } from 'react-redux';

import NotificationsListView from './NotificationsListView';

export default compose(
  connect(
    state => ({
      notifications: state.notifications.notifications,
    }),
  ),
)(NotificationsListView);
