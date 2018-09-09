/* eslint-disable no-undef */
import moment from 'moment';
import {
  getNotificationsInterval,
  getFormattedNotificationsInterval,
} from './AddNewView';

describe('getNotificationsInterval function', () => {
  it('should return correct values', () => {
    expect(getNotificationsInterval(
      moment().hour(8).minute(0),
      moment().hour(17).minute(0),
      8,
    )).toEqual({ hours: 1, minutes: 0 });

    expect(getNotificationsInterval(
      moment().hour(8).minute(0),
      moment().hour(11).minute(0),
      2,
    )).toEqual({ hours: 1, minutes: 0 });
  });
});

describe('getFormattedNotificationsInterval function', () => {
  it('should return correct values', () => {
    expect(getFormattedNotificationsInterval(
      moment().hour(8).minute(0),
      moment().hour(17).minute(0),
      8,
    )).toEqual('each 1h');

    expect(getFormattedNotificationsInterval(
      moment().hour(8).minute(0),
      moment().hour(11).minute(0),
      5,
    )).toEqual('each 30m');

    expect(getFormattedNotificationsInterval(
      moment().hour(9).minute(0),
      moment().hour(18).minute(0),
      7,
    )).toEqual('each 1h and 8m');
  });
});
