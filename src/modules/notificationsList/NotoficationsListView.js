import React from 'react';
import {
  View,
  Text,
} from 'react-native-ui-lib';

import { PlusButton } from '../../components';

export default function HomeView() {
  return (
    <View flex centerV centerH padding-20 bg-lightGray>
      <Text h1>No items!</Text>
      <Text p>Add them by clicking the button</Text>

      <PlusButton />
    </View>
  );
}
