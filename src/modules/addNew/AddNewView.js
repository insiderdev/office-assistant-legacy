/**
 * @flow
 */
import * as React from 'react';
import {
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import type Moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Switch,
} from 'react-native-ui-lib';

import { colors, fonts, scale } from '../../styles';

export type AddNewViewPropsType = {
  autoConfirm: boolean,
  setAutoConfirm: (boolean) => void,
  navigation: {
    pop: () => void,
  },
  isStartTimePickerVisible: boolean,
  setStartTimePickerVisible: (boolean) => void,
  isEndTimePickerVisible: boolean,
  setEndTimePickerVisible: (boolean) => void,
  startTime: Moment,
  endTime: Moment,
  setStartTime: (any) => void,
  setEndTime: (any) => void,
  handleTimePicked: (any) => void,
  closeTimePicker: () => void,
};

export default function AddNewView(props: AddNewViewPropsType): React.Node {
  const {
    autoConfirm,
    setAutoConfirm,
    navigation,
    startTime,
    endTime,
    isStartTimePickerVisible,
    setStartTimePickerVisible,
    isEndTimePickerVisible,
    setEndTimePickerVisible,
    handleTimePicked,
    closeTimePicker,
  } = props;

  return (
    <View flex bg-lightGray paddingV-30>
      <View row centerV paddingH-20>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Image
            assetGroup="icons"
            assetName="arrowBack"
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text h2 marginL-15 darkBlue>Add New</Text>
      </View>

      <View bg-white padding-20 marginV-30>
        <View marginV-15>
          <Text darkGray h4>Remind me to:</Text>
          <View row spread marginT-7 centerV>
            <Text h3 black>Drink Water</Text>
            <Image
              assetGroup="icons"
              assetName="chevronDown"
              style={{
                width: 14,
              }}
              resizeMode="contain"
            />
          </View>
        </View>

        <View marginV-15>
          <Text darkGray h4>How many times?</Text>
          <View row spread marginT-7 centerV>
            <Text h3 black>10 times</Text>
            <Image
              assetGroup="icons"
              assetName="chevronDown"
              style={{
                width: 14,
              }}
              resizeMode="contain"
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => setStartTimePickerVisible(true)}>
          <View marginV-15>
            <Text darkGray h4>Start time:</Text>
            <View row spread marginT-7 centerV>
              <Text h3 black>{moment(startTime).format('hh:mm A')}</Text>
              <Image
                assetGroup="icons"
                assetName="chevronDown"
                style={{
                  width: 14,
                }}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setEndTimePickerVisible(true)}>
          <View marginV-15>
            <Text darkGray h4>End time:</Text>
            <View row spread marginT-7 centerV>
              <Text h3 black>{moment(endTime).format('hh:mm A')}</Text>
              <Image
                assetGroup="icons"
                assetName="chevronDown"
                style={{
                  width: 14,
                }}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableOpacity>

        <View marginV-15>
          <View row spread marginT-7 centerV>
            <Text h3 black>Auto confirm</Text>
            <Switch
              height={24}
              width={55}
              thumbColor={colors.white}
              offColor={colors.gray}
              onColor={colors.red}
              onValueChange={setAutoConfirm}
              value={autoConfirm}
            />
          </View>
        </View>
      </View>

      <View paddingH-30 paddingV-10 centerH venterV>
        <Button
          backgroundColor={colors.red}
          label="add new"
          labelStyle={{
            fontFamily: fonts.primary,
            fontWeight: 'bold',
          }}
          style={{
            paddingVertical: 10,
            width: scale(140),
          }}
          testID="add-item-button"
        />
      </View>

      <DateTimePicker
        mode="time"
        isVisible={isStartTimePickerVisible || isEndTimePickerVisible}
        onConfirm={handleTimePicked}
        onCancel={closeTimePicker}
        date={isStartTimePickerVisible ? startTime.toDate() : endTime.toDate()}
        is24Hour
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 25,
  },
});
