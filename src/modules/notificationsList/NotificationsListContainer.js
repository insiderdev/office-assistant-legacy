import { compose } from 'recompose';
import { connect } from 'react-redux';

import NotificationsListView from './NotificationsListView';
import { deleteNotification } from './NotificationsListState';

export default compose(
  connect(
    state => ({
      notifications: state.notifications.notifications,
    }),
    dispatch => ({
      deleteNotification: notification => dispatch(deleteNotification(notification)),
    }),
  ),
)(NotificationsListView);
