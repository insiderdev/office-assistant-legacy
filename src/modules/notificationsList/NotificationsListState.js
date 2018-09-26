// @flow
import moment from 'moment';
import type Moment from 'moment';
import PushNotification from 'react-native-push-notification';

const ADD_NOTIFICATION = 'NotificationsList/ADD_NOTIFICATION';
const DELETE_NOTIFICATION = 'NotificationsList/DELETE_NOTIFICATION';

function getUniqueId(s: string): number {
  // eslint-disable-next-line no-param-reassign,no-bitwise
  let stringId = s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
  stringId = (`${stringId}`).substring(0, 5);
  return Math.abs(parseInt(stringId, 10));
}

export type NotificationItem = {|
  id: number,
  title: string,
  startTime: Moment,
  endTime: Moment,
  frequency: number,
  notificationsTimes: Array<Moment>,
  notificationsIds: Array<string>,
  done: number,
  skipWeekend: boolean,
|}

export type State = {
  notifications: Array<NotificationItem>,
};

type Action = {
  type: string,
  payload: NotificationItem,
}

type AsyncAction = ((Action) => void) => void;

const initialState: State = {
  notifications: [],
};

export function addNotification(notification: NotificationItem): AsyncAction {
  return (dispatch) => {
    const notificationId = getUniqueId(moment().toString());
    const notificationsIds = [];

    if (notification.skipWeekend) {
      // Create weekly notifications
      // This numbers are days of the week in moment (0 is Sunday, 6 is Saturday)
      [1, 2, 3, 4, 5].forEach((weekDay) => {
        notification.notificationsTimes.forEach((notificationTime, index) => {
          notificationsIds.push(`${notificationId}${weekDay}${index}`);
          PushNotification.localNotificationSchedule({
            id: `${notificationId}${weekDay}${index}`,
            message: `Time to ${notification.title}`,
            date: moment(notificationTime).day(weekDay).toDate(),
            repeatType: 'week',
          });
        });
      });
    } else {
      // Creating daily notifications
      notification.notificationsTimes.forEach((notificationTime, index) => {
        notificationsIds.push(`${notificationId}${index}`);
        PushNotification.localNotificationSchedule({
          id: `${notificationId}${index}`,
          message: `Time to ${notification.title}`,
          date: moment(notificationTime).toDate(),
          repeatType: 'day',
        });
      });
    }

    dispatch({
      type: ADD_NOTIFICATION,
      payload: {
        id: notificationId,
        ...notification,
        notificationsIds,
      },
    });
  };
}

export function deleteNotification(notification: NotificationItem): AsyncAction {
  return (dispatch) => {
    notification.notificationsIds.forEach((notificationId) => {
      PushNotification.cancelLocalNotifications({
        id: notificationId,
      });
    });

    dispatch({
      type: DELETE_NOTIFICATION,
      payload: notification,
    });
  };
}

export default function NotificationsListReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        notifications: [
          ...state.notifications,
          action.payload,
        ],
      };
    case DELETE_NOTIFICATION:
      return {
        notifications: [
          ...state.notifications.filter(n => n.id !== action.payload.id),
        ],
      };
    default:
      return state;
  }
}
