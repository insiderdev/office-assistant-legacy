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

import { colors } from '../styles';

type NotificationCardProps = {
  name: string,
  done: number,
  total: number,
  nextNotificationSeconds: number,
  totalIntervalSeconds: number,
};

export default function NotificationCard(props: NotificationCardProps) {
  const {
    name,
    done,
    total,
    nextNotificationSeconds,
  } = props;

  return (
    <Card borderRadius={3} marginH-10 marginT-15 flex>
      <View spread row padding-20>
        <View>
          <Text marginB-10 h1>{name}</Text>
          <Text>{done} / {total}</Text>
        </View>

        <View>
          <Text>{nextNotificationSeconds}</Text>
        </View>
      </View>
      <ProgressBar
        progress={done / total * 100}
        height={3}
        backgroundColor={colors.red}
        progressBackgroundColor={colors.lightenRed}
      />
    </Card>
  );
}
