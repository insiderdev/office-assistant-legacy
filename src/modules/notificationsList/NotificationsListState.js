// @flow
import type Moment from 'moment';

const ADD_NOTIFICATION = 'NotificationsList/ADD_NOTIFICATION';

export type NotificationItem = {|
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
  payload: any | NotificationItem,
}

type AsyncAction = ((Action) => void) => void;

const initialState: State = {
  notifications: [],
};

export function addNotification(notification: NotificationItem): Action | AsyncAction {
  return {
    type: ADD_NOTIFICATION,
    payload: notification,
  };
  // TODO Create notifications here
  // return (dispatch) => {
  //   dispatch({
  //     type: ADD_NOTIFICATION,
  //     payload: notification,
  //   });
  // };
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
    default:
      return state;
  }
}
