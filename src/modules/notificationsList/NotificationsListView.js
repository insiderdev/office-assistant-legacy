/**
 * @flow
 */
import React from 'react';
import {
  FlatList,
} from 'react-native';
import {
  View,
  Text,
} from 'react-native-ui-lib';

import { PlusButton, NotificationCard } from '../../components';

type NotificationListViewPropsType = {
  navigation: {
    navigate: (string) => void,
  },
}

export default function NotificationListView(props: NotificationListViewPropsType) {
  const notifications = [{
    name: 'Drink water',
    done: 4,
    total: 10,
    nextNotificationSeconds: 100,
    totalIntervalSeconds: 300,
  }, {
    name: 'Standup',
    done: 5,
    total: 10,
    nextNotificationSeconds: 100,
    totalIntervalSeconds: 300,
  }];

  return (
    <View flex centerV bg-lightGray>
      <FlatList
        style={{ paddingTop: 30 }}
        data={notifications}
        renderItem={({ item }) => <NotificationCard {...item} />}
        ListEmptyComponent={(
          <View>
            <Text h1>No items!</Text>
            <Text p>Add them by clicking the button</Text>
          </View>
        )}
      />

      <PlusButton onPress={() => props.navigation.navigate('AddNew')} />
    </View>
  );
}
