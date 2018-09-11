/**
 * @flow
 */
import * as React from 'react';
import {
  StyleSheet,
  TextInput,
} from 'react-native';
import moment from 'moment';
import type Moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Picker,
} from 'react-native-ui-lib';

import { Button } from '../../components';
import { colors, fonts } from '../../styles';

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
  frequency: {|
    label: string,
    value: number,
  |},
  notificationItem: {|
    label: string,
    value: number,
  |},
  setFrequency: (number) => void,
  setNotificationItem: (number) => void,
  customNotificationItem: string | null,
  setCustomNotificationItem: (string) => void,
  addNewNotification: () => void,
};

type PickerItemsType = Array<{|
  label: string,
  value: number,
|}>

const frequencyPickerValues: PickerItemsType = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 },
  { label: '11', value: 11 },
  { label: '12', value: 12 },
  { label: '13', value: 13 },
  { label: '14', value: 14 },
  { label: '15', value: 15 },
  { label: '16', value: 16 },
  { label: '17', value: 17 },
  { label: '18', value: 18 },
  { label: '19', value: 19 },
  { label: '20', value: 20 },
  { label: '21', value: 21 },
];

const notificationsNames: PickerItemsType = [
  { label: 'Custom (define your own)', value: 0 },
  { label: 'Drink water', value: 1 },
  { label: 'Standup', value: 2 },
  { label: 'Short walk', value: 3 },
  { label: 'Stretch', value: 4 },
];

export function getNotificationsInterval(
  startTime: Moment,
  endTime: Moment,
  frequency: number,
): { hours: number, minutes: number } {
  const diffInMinutes = Math.abs(Math.round(startTime.diff(endTime, 'minutes', true)));

  // We need this +1 to get a correct distribution
  const intervalInMinutes = Math.round(diffInMinutes / (frequency + 1));

  const result = { hours: 0, minutes: 0 };
  if (intervalInMinutes >= 60) {
    result.hours = Math.round(intervalInMinutes / 60);
  }
  result.minutes = Math.round(intervalInMinutes % 60);

  return result;
}

export function getFormattedNotificationsInterval(
  startTime: Moment,
  endTime: Moment,
  frequency: number,
) : string {
  const interval = getNotificationsInterval(startTime, endTime, frequency);
  let result = 'each';
  if (interval.hours) result += ` ${interval.hours}h`;
  if (interval.hours && interval.minutes) result += ' and';
  if (interval.minutes) result += ` ${interval.minutes}m`;

  return result;
}

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
    frequency,
    setFrequency,
    notificationItem,
    setNotificationItem,
    customNotificationItem,
    setCustomNotificationItem,
    addNewNotification,
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
        {/* User picked to enter custom value */}
        { notificationItem.value === 0 && (
          <View marginV-15>
            <Text darkGray h4>Remind me to:</Text>
            <View marginT-15 centerV>
              <TextInput
                value={customNotificationItem}
                placeholder="Write your own reminder"
                onChangeText={setCustomNotificationItem}
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  lineHeight: 22,
                  fontFamily: fonts.primary,
                  fontWeight: 'bold',
                }}
              />
            </View>
          </View>
        )}

        { notificationItem.value !== 0 && (
          <Picker
            value={notificationItem}
            onChange={setNotificationItem}
            containerStyle={{ marginTop: 20 }}
            topBarProps={{ title: 'Remind me to' }}
            renderPicker={() => (
              <View flex marginV-15>
                <Text darkGray h4>Remind me to:</Text>
                <View row spread marginT-7 centerV>
                  <Text h3 black>{notificationItem.label}</Text>
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
            )}
          >
            { notificationsNames.map(option => (
              <Picker.Item
                key={option.value}
                value={option.value}
                label={option.label}
              />
            ))}
          </Picker>
        )}

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

        <Picker
          title="Native Picker"
          placeholder="Pick a Language"
          value={frequency}
          onChange={setFrequency}
          containerStyle={{ marginTop: 20 }}
          topBarProps={{ title: 'Frequency' }}
          renderPicker={() => (
            <View flex marginV-15>
              <Text darkGray h4>How many times?</Text>
              <View row spread marginT-7 centerV>
                <Text h3 black>
                  {frequency.value} times ({getFormattedNotificationsInterval(startTime, endTime, frequency.value)})
                </Text>
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
          )}
        >
          { frequencyPickerValues.map(option => (
            <Picker.Item
              key={option.value}
              value={option.value}
              label={`${option.value} times (${getFormattedNotificationsInterval(startTime, endTime, option.value)})`}
            />
          ))}
        </Picker>

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
          label="add new"
          testID="add-item-button"
          onPress={addNewNotification}
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
