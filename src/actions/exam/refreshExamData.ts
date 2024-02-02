import Taro from '@tarojs/taro';
import { getExamData } from './getExamData';

export const refreshExamData = async () => {
  Taro.removeStorageSync('examRawData');
  const newData = await getExamData();
  return newData;
};
