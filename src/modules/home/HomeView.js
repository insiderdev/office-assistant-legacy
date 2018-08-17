import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
} from 'react-native-ui-lib';

import { colors, fonts, scale } from '../../styles';

export default function HomeView() {
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

      <Button
        backgroundColor={colors.red}
        label="Let's get started"
        labelStyle={{
          fontFamily: fonts.primary,
          fontWeight: 'bold',
        }}
        borderRadius={scale(5)}
        style={{
          paddingVertical: scale(13),
        }}
        testID="get-started-button"
      />
    </View>
  );
}
