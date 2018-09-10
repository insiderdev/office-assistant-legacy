import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native-ui-lib';

import { Button } from '../../components';

type Props = {
  navigation: {
    navigate: (string) => void,
  },
  setAppOpened: () => void,
};

export default function HomeView({ navigation, setAppOpened }: Props) {
  return (
    <View flex centerV padding-20 bg-white>
      <View flex centerV centerH padding-10>
        <Image
          assetName="person"
          assetGroup="illustrations"
        />
        <View marginT-20 marginB-10>
          <Text h1>Stay fit, while working!</Text>
        </View>
        <Text p center darkGray>
          Simple, yet important reminders to get you
          moving and stay healthy in your long sedentary
          office hours.
        </Text>
      </View>

      <View h-center v-center paddingH-50 marginB-20>
        <Button
          onPress={() => {
            setAppOpened();
            navigation.navigate('MainScreen');
          }}
          label="Let's get started"
          testID="get-started-button"
        />
      </View>
    </View>
  );
}
