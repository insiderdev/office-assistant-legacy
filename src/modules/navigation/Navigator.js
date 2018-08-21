import {
  createStackNavigator,
} from 'react-navigation';

import Home from '../home/HomeView';
import NotificationsList from '../notificationsList/NotoficationsListView';

export default createStackNavigator({
  Home,
  NotificationsList,
}, {
  headerMode: 'none',
  initialRouteName: 'NotificationsList',
});
