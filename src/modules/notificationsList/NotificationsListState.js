// @flow
import moment from 'moment';
import type Moment from 'moment';

const ADD_NOTIFICATION = 'NotificationsList/ADD_NOTIFICATION';
const DELETE_NOTIFICATION = 'NotificationsList/DELETE_NOTIFICATION';

function getUniqueId(s: string): number {
  // eslint-disable-next-line no-param-reassign,no-bitwise
  return s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
}

export type NotificationItem = {|
  id: number,
  title: string,
  startTime: Moment,
  endTime: Moment,
  frequency: number,
  notificationsTimes: Array<Moment>,
  notificationsIds: Array<number>,
  done: number,
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
  // TODO Create notifications here
  return (dispatch) => {
    dispatch({
      type: ADD_NOTIFICATION,
      payload: notification,
    });
  };
}

export function deleteNotification(notification: NotificationItem): AsyncAction {
  return (dispatch) => {
    // TODO: Unregister all notifications here
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
          {
            id: getUniqueId(moment().toString()),
            ...action.payload,
          },
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
