/**
 * @flow
 */
import * as React from 'react';
import {
  FlatList,
} from 'react-native';
import {
  View,
  Text,
} from 'react-native-ui-lib';

import { PlusButton, NotificationCard } from '../../components';
import type { NotificationItem } from './NotificationsListState';

type NotificationListViewPropsType = {
  navigation: {
    navigate: (string) => void,
  },
  notifications: Array<NotificationItem>,
}

export default function NotificationListView({ navigation, notifications }: NotificationListViewPropsType): React.Node {
  return (
    <View flex centerV bg-lightGray>
      <View paddingH-20 marginT-30 marginB-5>
        <Text h1>Office Assistant</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationCard notification={item} />}
        ListEmptyComponent={(
          <View flex centerH centerV paddingV-200>
            <Text h1>No items!</Text>
            <Text p>Add them by clicking the button</Text>
          </View>
        )}
      />

      <PlusButton onPress={() => navigation.navigate('AddNew')} />
    </View>
  );
}
