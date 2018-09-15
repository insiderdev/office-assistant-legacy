import { compose, lifecycle } from 'recompose';
import { Platform, StatusBar, UIManager } from 'react-native';

import AppView from './AppView';
import { colors } from '../styles';

export default compose(
  lifecycle({
    componentWillMount() {
      console.disableYellowBox = true;

      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(colors.red);

        // eslint-disable-next-line no-unused-expressions
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    },
  }),
)(AppView);
