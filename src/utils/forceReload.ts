import Taro from '@tarojs/taro';

export const forceReload = () => {
  // 清理小程序缓存
  Taro.clearStorage();
  // 重启小程序
  wx.restartMiniProgram({ path: '/pages/index/index' });
};
