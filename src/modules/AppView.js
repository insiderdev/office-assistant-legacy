import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native-ui-lib';

import { colors, fonts, scale } from '../styles';

export default function AppView() {
  return (
    <View flex centerV padding-20>
      <View flex centerV centerH padding-10>
        <Text h1>Stay fit, while working!</Text>
        <Text p center marginT-10 padding-10>
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
