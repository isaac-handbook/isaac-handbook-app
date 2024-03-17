import { Item } from '@typers/handbook';
import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';
import Taro from '@tarojs/taro';

export interface DevState {
  /** 转换器的错误日志 */
  transformerLog: {
    item: Partial<Item>;
    msg: string;
  }[];
  /** 系统信息 */
  systemInfo: Partial<Taro.getSystemInfoAsync.Result>;
}

export const devState = atom<DevState>({
  key: 'devState',
  default: {
    transformerLog: [],
    systemInfo: {},
  },
});

export const useDev = () => {
  const [dev, setDev] = useRecoilState(devState);

  const updateSingleDevState = <T extends keyof DevState>(
    key: T,
    value: DevState[T],
  ) => {
    setDev({
      ...dev,
      [key]: value,
    });
  };

  /** 记录一条转换器日志 */
  const logTransformer = useCallback((item: Partial<Item>, msg: string) => {
    setDev((prev) => ({
      ...prev,
      transformerLog: [
        ...prev.transformerLog,
        {
          item,
          msg,
        },
      ],
    }));
  }, []);

  return {
    dev,
    isIOS: dev.systemInfo.platform === 'ios',
    isAndroid: dev.systemInfo.platform === 'android',
    updateSingleDevState,
    setDev,
    logTransformer,
  };
};
