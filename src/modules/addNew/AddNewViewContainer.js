import { compose, withState, withHandlers } from 'recompose';
import moment from 'moment';

import AddNewView, { AddNewViewPropsType } from './AddNewView';

export default compose(
  withState('autoConfirm', 'setAutoConfirm', false),
  withState('startTime', 'setStartTime', moment().hour(8).minute(0)),
  withState('endTime', 'setEndTime', moment().hour(17).minute(0)),
  withState('isStartTimePickerVisible', 'setStartTimePickerVisible', false),
  withState('isEndTimePickerVisible', 'setEndTimePickerVisible', false),
  withHandlers({
    closeTimePicker: (props: AddNewViewPropsType) => () => {
      props.setStartTimePickerVisible(false);
      props.setEndTimePickerVisible(false);
    },
  }),
  // Need to use 2 separate handlers to be able to use closeTimePicker inside
  withHandlers({
    // Function called by TimePicker. Should set the picked time.
    handleTimePicked: (props: AddNewViewPropsType) => (date) => {
      if (props.isStartTimePickerVisible) {
        props.setStartTime(moment(date));
      }

      if (props.isEndTimePickerVisible) {
        props.setEndTime(moment(date));
      }

      props.closeTimePicker();
    },
  }),
)(AddNewView);
