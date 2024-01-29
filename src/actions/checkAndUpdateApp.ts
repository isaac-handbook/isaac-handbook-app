import { updateInfo } from '@src/config/config.app';
import Taro from '@tarojs/taro';

const { version: curVersion } = updateInfo;

type CheckRes = {
  // 当前是否需要更新
  shouldUpdate: boolean;
};

/**
 * 检查和刷新本地app缓存
 */
export const checkAndUpdateApp = async (): Promise<CheckRes> => {
  let shouldUpdate = false;

  // 和本地缓存的版本号比较，如果不一致，就显示更新提示
  const localAppInfo = Taro.getStorageSync('appInfo');
  // 版本有变，显示更新提示
  if (localAppInfo.version !== curVersion) {
    shouldUpdate = true;
    // 更新本地缓存
    Taro.setStorageSync('appInfo', {
      ...localAppInfo,
      version: curVersion,
    });
  }
  return {
    shouldUpdate,
  };
};
