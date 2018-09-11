import {
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

import Home from '../home/HomeViewContainer';
import NotificationsList from '../notificationsList/NotificationsListContainer';
import AddNew from '../addNew/AddNewViewContainer';

export default createSwitchNavigator({
  Home,
  MainScreen: createStackNavigator({
    NotificationsList,
    AddNew,
  }, {
    headerMode: 'none',
    initialRouteName: 'NotificationsList',
  }),
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
});
