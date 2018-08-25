import { compose, withState } from 'recompose';

import AddNewView from './AddNewView';

export default compose(
  withState('autoConfirm', 'setAutoConfirm', false),
)(AddNewView);
