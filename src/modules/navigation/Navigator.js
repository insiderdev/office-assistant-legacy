import {
  createStackNavigator,
} from 'react-navigation';

import Home from '../home/HomeView';

export default createStackNavigator({
  Home,
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
});
