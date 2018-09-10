import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import { setAppOpened } from '../AppState';
import HomeView from './HomeView';

export default compose(
  connect(
    state => ({
      isFirstOpen: state.app.isFirstOpen,
    }),
    dispatch => ({
      setAppOpened: () => dispatch(setAppOpened()),
    }),
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.isFirstOpen) {
        this.props.navigation.navigate('MainScreen');
      }
    },
  }),
)(HomeView);
