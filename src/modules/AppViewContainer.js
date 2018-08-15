import { compose, lifecycle } from 'recompose';

import AppView from './AppView';

export default compose(
  lifecycle({
    componentWillMount() {
      console.disableYellowBox = true;
    },
  }),
)(AppView);
