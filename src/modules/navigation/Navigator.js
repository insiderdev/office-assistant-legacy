import {
  createStackNavigator,
} from 'react-navigation';

import Home from '../home/HomeView';
import NotificationsList from '../notificationsList/NotificationsListView';
import AddNew from '../addNew/AddNewViewContainer';

export default createStackNavigator({
  Home,
  NotificationsList,
  AddNew,
}, {
  headerMode: 'none',
  initialRouteName: 'NotificationsList',
});
