import Taro from '@tarojs/taro';
import { getHandBookData } from './getHandBookData';

export const refreshHandBookData = async () => {
  Taro.removeStorageSync('handbookDataPart1');
  Taro.removeStorageSync('handbookDataPart2');
  Taro.removeStorageSync('handbookDataPart3');
  Taro.removeStorageSync('handbookDataPart4');
  Taro.removeStorageSync('handbookDataPart5');
  const newHandbookData = await getHandBookData();
  return newHandbookData;
};
