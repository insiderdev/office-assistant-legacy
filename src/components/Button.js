import React from 'react';
import {
  Button,
} from 'react-native-ui-lib';
import { colors, fonts } from '../styles';

export default function CustomButton(props) {
  return (
    <Button
      {...props}
      backgroundColor={colors.red}
      labelStyle={{
        fontFamily: fonts.primary,
        fontWeight: 'bold',
      }}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 50,
        ...props.style,
      }}
    />
  );
}
