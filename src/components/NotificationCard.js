/**
 * @flow
 */
import React from 'react';
import {
  View,
  Text,
  ProgressBar,
  Card,
  Image,
} from 'react-native-ui-lib';
import moment from 'moment';
import * as Progress from 'react-native-progress';


import { colors, fonts } from '../styles';
import type { NotificationItem } from '../modules/notificationsList/NotificationsListState';

type Props = {
  notification: NotificationItem
};

type State = {
  nextNotificationDiffSeconds: number,
  notificationNumber: number,
  notificationSecondsInterval: number,
};

export default class NotificationCard extends React.Component<Props, State> {
  // eslint-disable-next-line react/sort-comp
  _interval: any;

  constructor(props: Props) {
    super(props);

    const { notification } = props;
    let nextNotification = null;

    let notificationNumber = 0;
    for (; notificationNumber < notification.notificationsTimes.length; notificationNumber += 1) {
      const notTime = moment(notification.notificationsTimes[notificationNumber]);
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
          moment().hour(nextNotification.hour()).minute(nextNotification.minute()).second(0),
          'second',
        )) : 0,
      notificationNumber,
      notificationSecondsInterval: Math.round(
        moment(notification.endTime)
          .diff(moment(notification.startTime), 'second') /
        notification.frequency),
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
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.primary,
                color: colors.textGray,
              }}
            >
              {this.state.notificationNumber} / {notification.frequency}
            </Text>
          </View>

          <View spread centerV centerH>
            <View
              style={{
                width: 30,
                height: 30,
                position: 'relative',
              }}
            >
              <Progress.Circle
                thickness={2}
                size={30}
                unfilledColor="#D2C7D6"
                color="#4A90E2"
                progress={1 - (this.state.nextNotificationDiffSeconds / this.state.notificationSecondsInterval)}
                direction="counter-clockwise"
                borderWidth={0}
              />
              <View
                style={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  assetGroup="icons"
                  assetName="check"
                  resizeMode="contain"
                  style={{ width: 12, height: 12 }}
                />
              </View>
            </View>
            <View centerH style={{ width: 40 }}>
              { this.state.nextNotificationDiffSeconds && (
                <Text style={{ color: colors.darkBlue }}>
                  {Math.floor(Math.abs(this.state.nextNotificationDiffSeconds) / 60)}:
                  {Math.round(Math.abs(this.state.nextNotificationDiffSeconds) % 60)}
                </Text>
              )}
            </View>
          </View>
        </View>
        <ProgressBar
          progress={this.state.notificationNumber / notification.frequency * 100}
          height={3}
          backgroundColor={colors.red}
          progressBackgroundColor={colors.lightenRed}
        />
      </Card>
    );
  }
}
