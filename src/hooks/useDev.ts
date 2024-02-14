import { Item } from '@typers/handbook';
import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

export interface DevState {
  /** 转换器的错误日志 */
  transformerLog: {
    item: Partial<Item>;
    msg: string;
  }[];
}

export const devState = atom<DevState>({
  key: 'devState',
  default: {
    transformerLog: [],
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
    updateSingleDevState,
    setDev,
    logTransformer,
  };
};
