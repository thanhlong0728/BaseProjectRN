/* eslint-disable consistent-this */

import moment from 'moment';
import {Dimensions} from 'react-native';

export const debounce = (func: any, delay: any) => {
  let debounceTimer: any;

  return function (this: any) {
    const context = this;
    const arg = arguments;
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      func.apply(context, arg);
    }, delay);
  };
};

export const formatNumber = (number: number) => {
  if (number < 1000) {
    return number.toString();
  } else if (number >= 1000 && number <= 999999) {
    return (number / 1000).toFixed(1) + 'k';
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'm';
  }
};

export const getFiletype = (uri: string | null) =>
  uri?.lastIndexOf('.') !== -1 ? uri?.substring(uri?.lastIndexOf('.') + 1) : '';

export const getExtFilename = (
  filename: string | null,
  mimeFile: string | null,
) => getFiletype(filename) || getFiletypeMpeg(mimeFile);

export const getFiletypeMpeg = (type: string | null) => {
  switch (type) {
    case 'audio/mpeg':
    case 'audio/mpeg3':
      return 'mp3';
    case 'video/mp4':
      return 'mp4';
    case 'audio/mp4':
    case 'audio/x-m4a':
      return 'm4a';
    default:
      return '';
  }
};

export const getLastChar = (str: string, len: number) =>
  str.substring(str.length - len, str.length);

export function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
}

export const formatCommaNumber = (num: number = 0) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const minTwoDigits = (n: number = 0) => (n < 10 ? '0' : '') + n;

export const formatStringDate = (date?: string | Date, typeFormat?: string) => {
  const today = moment(date).format(typeFormat || 'YYYY/MM/DD HH:mm');

  return today;
};

/**
 *
 * @description Get screen size
 * @returns width: number
 */
export const getScreenWidth = (): number => {
  const width = Dimensions.get('window').width;

  return width;
};

/**
 *
 * @description Get screen height
 * @returns height: number
 */
export const getScreenHeight = (): number => {
  const height = Dimensions.get('window').height;

  return height;
};

/**
 * @description await sleet with time
 */
export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));
