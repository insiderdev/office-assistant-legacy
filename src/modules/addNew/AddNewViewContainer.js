import { compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import moment from 'moment';

import AddNewView, { AddNewViewPropsType, getNotificationsInterval } from './AddNewView';
import { addNotification } from '../notificationsList/NotificationsListState';

export default compose(
  connect(
    null,
    dispatch => ({
      addNotification: notification => dispatch(addNotification(notification)),
    }),
  ),
  withState('skipWeekend', 'setSkipWeekend', false),
  withState('startTime', 'setStartTime', moment().hour(8).minute(0)),
  withState('endTime', 'setEndTime', moment().hour(17).minute(0)),
  withState('isStartTimePickerVisible', 'setStartTimePickerVisible', false),
  withState('isEndTimePickerVisible', 'setEndTimePickerVisible', false),
  withState('frequency', 'setFrequency', { label: '8', value: 8 }),
  withState('notificationItem', 'setNotificationItem', { label: 'Drink water', value: 1 }),
  withState('customNotificationItem', 'setCustomNotificationItem', null),
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
    addNewNotification: (props: AddNewViewPropsType) => () => {
      const {
        skipWeekend,
        startTime,
        endTime,
        frequency,
        notificationItem,
        customNotificationItem,
        addNotification: add,
        navigation,
      } = props;

      if (notificationItem.value === 0 && !customNotificationItem) return;

      const notificationInterval = getNotificationsInterval(startTime, endTime, frequency.value);
      const startTimeCopy = moment(startTime);
      const notificationsTimes = [];
      for (let i = 0; i < frequency.value; i += 1) {
        startTimeCopy.add(notificationInterval.hours, 'hours').add(notificationInterval.minutes, 'minutes');
        notificationsTimes.push(moment(startTimeCopy));
      }

      add({
        title: customNotificationItem || notificationItem.label,
        startTime,
        endTime,
        frequency: frequency.value,
        notificationsTimes,
        notificationsIds: [],
        skipWeekend,
        done: 0,
      });

      navigation.pop();
    },
  }),
)(AddNewView);
