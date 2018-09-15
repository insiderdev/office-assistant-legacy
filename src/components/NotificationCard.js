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

    this._setNextIteration = this._setNextIteration.bind(this);
    this._timerTick = this._timerTick.bind(this);
    this._setTimer = this._setTimer.bind(this);
    this._clearTimer = this._clearTimer.bind(this);

    this._setNextIteration();
  }

  componentWillUnmount() {
    this._clearTimer();
  }

  _addLeadingZero = (n: number): string => (`${n}`.length < 2 ? `0${n}` : `${n}`);

  _setTimer = () => {
    if (this.state.nextNotificationDiffSeconds) {
      this._interval = setInterval(this._timerTick, 1000);
    }
  };

  _clearTimer = () => {
    if (this._interval) {
      clearInterval(this._interval);
    }
  };

  _setNextIteration = () => {
    const { notification } = this.props;
    let nextNotification = moment();
    const notificationSecondsInterval = Math.round(
      moment(notification.endTime)
        .diff(moment(notification.startTime), 'second') /
      notification.frequency);

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

    if (
      moment() < moment(notification.startTime) ||
      moment() > moment(notification.endTime).subtract(notificationSecondsInterval, 'seconds') ||
      notificationNumber === notification.frequency
    ) {
      nextNotification = null;
    }

    const newState = {
      nextNotificationDiffSeconds: nextNotification ?
        Math.abs(moment().diff(
          moment().hour(nextNotification.hour()).minute(nextNotification.minute()).second(0),
          'second',
        )) : 0,
      notificationNumber,
      notificationSecondsInterval,
    };

    if (this.state) {
      this.setState({
        ...newState,
      });
    } else {
      this.state = newState;
    }

    if (nextNotification) {
      this._setTimer();
    }
  };

  _timerTick = () => {
    this.setState(prevState => ({
      nextNotificationDiffSeconds: prevState.nextNotificationDiffSeconds - 1,
    }));
    if (this.state.nextNotificationDiffSeconds < 0) {
      clearInterval(this._interval);
      this._setNextIteration();
    }
  };

  render() {
    const {
      notification,
    } = this.props;

    return (
      <Card borderRadius={3} marginH-20 marginT-15 flex>
        <View spread row padding-20>
          <View>
            <Text marginB-10 h1 darkBlue>{notification.title}</Text>
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
                  assetName={this.state.nextNotificationDiffSeconds <= 0 ? 'checkDone' : 'check'}
                  resizeMode="contain"
                  style={{ width: 12, height: 12 }}
                />
              </View>
            </View>
            <View centerH style={{ width: 40 }}>
              { this.state.nextNotificationDiffSeconds <= 0 && (
                <Text style={{ color: colors.darkBlue }}>00:00</Text>
              )}
              { this.state.nextNotificationDiffSeconds > 0 && (
                <Text style={{ color: colors.darkBlue }}>
                  {this._addLeadingZero(Math.floor(Math.abs(this.state.nextNotificationDiffSeconds) / 60))}:
                  {this._addLeadingZero(Math.round(Math.abs(this.state.nextNotificationDiffSeconds) % 60))}
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
