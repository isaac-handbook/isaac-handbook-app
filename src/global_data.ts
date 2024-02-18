const globalData = {
  /** 转换器的日志 */
  transformerLogs: [],
};

export function setGlobalData(key, val) {
  globalData[key] = val;
}

export function getGlobalData(key) {
  return globalData[key];
}
