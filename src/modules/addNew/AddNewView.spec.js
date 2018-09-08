/* eslint-disable no-undef */
import moment from 'moment';
import {
  getNotificationsInterval,
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
