/**
 * @flow
 */
import * as React from 'react';
import {
  FlatList,
  SafeAreaView,
} from 'react-native';
import {
  View,
  Text,
} from 'react-native-ui-lib';

import { colors } from '../../styles';
import { PlusButton, NotificationCard } from '../../components';
import type { NotificationItem } from './NotificationsListState';

type NotificationListViewPropsType = {
  navigation: {
    navigate: (string) => void,
  },
  notifications: Array<NotificationItem>,
  deleteNotification: (NotificationItem) => void,
}

export default function NotificationListView(props: NotificationListViewPropsType): React.Node {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.lightGray }}>
      <View flex centerV bg-lightGray>
        <View paddingH-20 marginT-20 marginB-5>
          <Text h1 darkBlue>Office Assistant</Text>
        </View>

        <FlatList
          data={props.notifications}
          renderItem={({ item }) => (
            <NotificationCard
              notification={item}
              onDelete={() => {
                props.deleteNotification(item);
              }}
            />
          )}
          ListEmptyComponent={(
            <View flex centerH centerV paddingV-200>
              <Text h1 darkBlue>No items!</Text>
              <Text p>Add them by clicking the button</Text>
            </View>
          )}
        />

        <PlusButton onPress={() => props.navigation.navigate('AddNew')} />
      </View>
    </SafeAreaView>
  );
}
