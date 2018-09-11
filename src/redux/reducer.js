import { combineReducers } from 'redux';

import app from '../modules/AppState';
import notifications from '../modules/notificationsList/NotificationsListState';

export default combineReducers({
  app,
  notifications,
});
