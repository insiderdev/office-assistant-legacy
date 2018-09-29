import {
  compose,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose';
import { connect } from 'react-redux';
import moment from 'moment';

import AddNewView, { AddNewViewPropsType, getNotificationsInterval, notificationsNames } from './AddNewView';
import {
  addNotification,
  editNotification,
} from '../notificationsList/NotificationsListState';

export default compose(
  connect(
    null,
    dispatch => ({
      addNotification: notification => dispatch(addNotification(notification)),
      editNotification: notification => dispatch(editNotification(notification)),
    }),
  ),
  withState('skipWeekend', 'setSkipWeekend', true),
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
        editNotification: edit,
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

      if (navigation.state.params && navigation.state.params.edit) {
        edit({
          ...navigation.state.params.notification,
          title: customNotificationItem || notificationItem.label,
          startTime,
          endTime,
          frequency: frequency.value,
          notificationsTimes,
          skipWeekend,
          done: 0,
        });
      } else {
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
      }

      navigation.pop();
    },
  }),
  lifecycle({
    componentWillMount() {
      if (this.props.navigation.state.params && this.props.navigation.state.params.edit) {
        const notificationToEdit = this.props.navigation.state.params.notification;
        this.props.setSkipWeekend(notificationToEdit.skipWeekend);
        this.props.setStartTime(moment(notificationToEdit.startTime));
        this.props.setEndTime(moment(notificationToEdit.endTime));
        this.props.setFrequency({ label: `${notificationToEdit.frequency}`, value: notificationToEdit.frequency });

        const notificationLabel = notificationsNames.find(name => name.label === notificationToEdit.title);
        if (notificationLabel) {
          this.props.setNotificationItem(notificationLabel);
        } else {
          this.props.setCustomNotificationItem(notificationToEdit.title);
        }
      }
    },
  }),
)(AddNewView);
