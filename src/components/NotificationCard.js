/**
 * @flow
 */
import React from 'react';
import {
  View,
  Text,
  ProgressBar,
  Card,
} from 'react-native-ui-lib';
import moment from 'moment';

import { colors } from '../styles';
import type { NotificationItem } from '../modules/notificationsList/NotificationsListState';

type Props = {
  notification: NotificationItem
};

type State = {
  nextNotificationDiffSeconds: number,
};

export default class NotificationCard extends React.Component<Props, State> {
  // eslint-disable-next-line react/sort-comp
  _interval: any;

  constructor(props: Props) {
    super(props);

    const { notification } = props;
    let nextNotification = null;

    for (let i = 0; i < notification.notificationsTimes.length; i += 1) {
      const notTime = moment(notification.notificationsTimes[i]);
      if (notTime && moment()
        .hour(notTime.hour())
        .minute(notTime.minute())
        .diff(moment(), 'second') > 0
      ) {
        nextNotification = moment(notTime);
        break;
      }
    }

    this.state = {
      nextNotificationDiffSeconds: nextNotification ?
        Math.abs(moment().diff(
          moment().hour(nextNotification.hour()).minute(nextNotification.minute()),
          'second',
        )) : 0,
    };

    this._timerTick = this._timerTick.bind(this);
  }

  componentDidMount() {
    if (this.state.nextNotificationDiffSeconds) {
      this._interval = setInterval(this._timerTick, 1000);
    }
  }

  componentWillUnmount() {
    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  _timerTick = () => {
    this.setState(prevState => ({
      nextNotificationDiffSeconds: prevState.nextNotificationDiffSeconds - 1,
    }));
  };

  render() {
    const {
      notification,
    } = this.props;

    return (
      <Card borderRadius={3} marginH-20 marginT-15 flex>
        <View spread row padding-20>
          <View>
            <Text marginB-10 h1>{notification.title}</Text>
            <Text>{notification.done} / {notification.frequency}</Text>
          </View>

          <View>
            { this.state.nextNotificationDiffSeconds && (
              <Text>
                {Math.floor(Math.abs(this.state.nextNotificationDiffSeconds) / 60)}:
                {Math.round(Math.abs(this.state.nextNotificationDiffSeconds) % 60)}
              </Text>
            )}
          </View>
        </View>
        <ProgressBar
          progress={notification.done / notification.frequency * 100}
          height={3}
          backgroundColor={colors.red}
          progressBackgroundColor={colors.lightenRed}
        />
      </Card>
    );
  }
}
