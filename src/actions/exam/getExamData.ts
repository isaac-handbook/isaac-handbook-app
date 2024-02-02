import { EXAM_DATA_OSS_URL } from '@constants';
import Taro from '@tarojs/taro';
import { ExamRawData } from '@typers/exam';
import { sleep } from '@utils/sleep';

// 请求失败后重试的次数
let reTryTimes = 0;

/**
 * 从缓存或接口获取试卷数据
 */
export const getExamData = async (): Promise<ExamRawData> => {
  try {
    const cacheData = getFromStorage();
    if (cacheData.length > 0) {
      return initJsonData(cacheData);
    } else {
      const res = await Taro.cloud.downloadFile({
        fileID: EXAM_DATA_OSS_URL,
      });
      const fileData = Taro.getFileSystemManager().readFileSync(
        res.tempFilePath,
        'utf-8',
      );
      if (typeof fileData === 'string') {
        saveToStorage(fileData);
        return initJsonData(fileData);
      }
      throw new Error('数据获取失败');
    }
  } catch (error) {
    if (++reTryTimes > 5) {
      throw new Error('数据获取失败，重试次数过多');
    }
    console.warn('数据获取失败，即将重试');
    console.warn(error);
    await sleep(500);
    return getExamData();
  }
};

/**
 * 获取缓存数据
 * @returns
 */
const getFromStorage = () => {
  let data = '';
  try {
    data = Taro.getStorageSync('examRawData');
  } catch (err) {}

  return data;
};

/**
 * 格式化JSON数据
 * @param data
 * @returns ExamRawData
 */
const initJsonData = (data: string) => {
  const res = JSON.parse(data) as ExamRawData;
  if (!res?.item?.length) {
    throw new Error('缓存数据异常');
  }

  return res;
};

/**
 * 将数据存入缓存
 * @param data
 */
const saveToStorage = (data: string) => {
  Taro.setStorageSync('examRawData', data);
};
