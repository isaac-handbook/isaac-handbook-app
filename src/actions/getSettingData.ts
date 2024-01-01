import { defaultSettingInfo } from '@hooks/useSetting';
import Taro from '@tarojs/taro';

/**
 * 从缓存获取设置数据
 */
export const getSettingData = async () => {
  try {
    const storedSetting = await Taro.getStorage({ key: 'setting' });
    return storedSetting.data;
  } catch {
    return defaultSettingInfo;
  }
};
