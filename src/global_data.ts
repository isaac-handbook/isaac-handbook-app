import { Cloud, EnvironmentType } from 'laf-client-sdk';

const globalData = {
  cloud: new Cloud({
    baseUrl: 'https://xi1g8r.laf.run',
    getAccessToken: () => wx.getStorageSync('access_token'),
    environment: EnvironmentType.WX_MP,
  }),
};

export function setGlobalData(key, val) {
  globalData[key] = val;
}

export function getGlobalData(key) {
  return globalData[key];
}
