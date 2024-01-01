import Taro from '@tarojs/taro';
import { useEffect } from 'react';
import { atom, selector, useRecoilState, useRecoilValueLoadable } from 'recoil';
import { HANDBOOK_DATA_OSS_URL } from '../constants';
import { HandBookData } from 'src/types/handbook';
import { forceReload } from '@utils/forceReload';

const defaultHandbookData: HandBookData = {
  isLoaded: false,
  items: [],
  trinkets: [],
  cards: [],
  pills: [],
  chara: {},
  extra: { tagInfo: {}, table: {}, revive: [] } as any,
};

export const handbookDataState = atom<HandBookData>({
  key: 'handbookData',
  default: defaultHandbookData,
});

const errorState = atom<boolean>({
  key: 'error',
  default: false,
});

const refreshState = atom<number>({
  key: 'refresh',
  default: 0,
});

const fetchingState = atom<{
  targetNum: number;
  currentNum: number;
}>({
  key: 'fetching',
  default: {
    targetNum: 0,
    currentNum: 0,
  },
});

export const handbookDataSelector = selector<HandBookData>({
  key: 'handbookDataSelector',
  get: async ({ get }) => {
    get(refreshState);
    try {
      // 获取缓存数据
      const getFromStorage = () => {
        let data = '';
        try {
          data =
            Taro.getStorageSync('handbookDataPart1') +
            Taro.getStorageSync('handbookDataPart2') +
            Taro.getStorageSync('handbookDataPart3') +
            Taro.getStorageSync('handbookDataPart4') +
            Taro.getStorageSync('handbookDataPart5');
        } catch (err) {}

        return data;
      };

      const initJsonData = (data: string) => {
        const res = JSON.parse(data) as HandBookData;
        if (!res.items?.length || !res.trinkets?.length) {
          throw new Error('缓存数据异常');
        }
        // 所有 items 都加入 type=item
        res.items = res.items.map((item) => ({
          ...item,
          type: 'item',
        }));
        // 所有 trinkets 都加入 type=trinket
        res.trinkets = res.trinkets.map((trinket) => ({
          ...trinket,
          type: 'trinket',
        }));
        // 所有 cards 都加入 type=card
        res.cards = res.cards.map((card) => ({
          ...card,
          type: 'card',
        }));
        // 所有 pills 都加入 type=pill
        res.pills = res.pills.map((pill) => ({
          ...pill,
          type: 'pill',
        }));
        // 所有 chara 都加入 type=chara
        Object.keys(res.chara).forEach((key) => {
          res.chara[key] = {
            ...res.chara[key],
            type: 'chara',
          };
        });

        return res;
      };

      // 存到缓存
      const saveToStorage = (data: string) => {
        // 由于微信缓存单条上限1mb，因此将数据拆成4份存储
        const dataLength = data.length;
        const partLength = Math.ceil(dataLength / 5);
        const part1 = data.slice(0, partLength);
        const part2 = data.slice(partLength, partLength * 2);
        const part3 = data.slice(partLength * 2, partLength * 3);
        const part4 = data.slice(partLength * 3, partLength * 4);
        const part5 = data.slice(partLength * 4);
        Taro.setStorage({
          key: 'handbookDataPart1',
          data: part1,
        });
        Taro.setStorage({
          key: 'handbookDataPart2',
          data: part2,
        });
        Taro.setStorage({
          key: 'handbookDataPart3',
          data: part3,
        });
        Taro.setStorage({
          key: 'handbookDataPart4',
          data: part4,
        });
        Taro.setStorage({
          key: 'handbookDataPart5',
          data: part5,
        });
      };

      const cacheData = getFromStorage();
      if (cacheData.length > 0) {
        return {
          ...initJsonData(cacheData),
          isLoaded: true,
        };
      } else {
        const res = await Taro.cloud.downloadFile({
          fileID: HANDBOOK_DATA_OSS_URL,
        });
        const fileData = Taro.getFileSystemManager().readFileSync(
          res.tempFilePath,
          'utf-8',
        );

        if (typeof fileData === 'string') {
          saveToStorage(fileData);
          return {
            ...initJsonData(fileData),
            isLoaded: true,
          };
        }

        throw new Error('Failed to parse data');
      }
    } catch (error) {
      throw error;
    }
  },
});

export const useHandBookData = () => {
  const loadHandbookData = useRecoilValueLoadable(handbookDataSelector);
  const [handbookData, setHandbookData] = useRecoilState(handbookDataState);
  const [fetching, setFetching] = useRecoilState(fetchingState);
  const [error, setError] = useRecoilState(errorState);
  const [, setRefresh] = useRecoilState(refreshState);

  const oneFetchIsStarted = () => {
    setFetching((prev) => ({
      targetNum: prev.targetNum + 1,
      currentNum: 0,
    }));
  };

  const oneFetchIsDone = () => {
    setFetching((prev) => ({
      targetNum: prev.targetNum,
      currentNum: prev.currentNum + 1,
    }));
  };

  // 控制页面 loading 态
  useEffect(() => {
    // 当前有未完成的请求，页面 loading
    if (fetching.targetNum > 0 && fetching.currentNum < fetching.targetNum) {
      Taro.showLoading({
        title: '加载中...',
        mask: true,
      });
      // 最多loading五秒
      setTimeout(() => {
        Taro.hideLoading();
      }, 5000);
    }

    // 当前进行中的所有请求都完成了，关闭 loading
    if (fetching.currentNum === fetching.targetNum && fetching.targetNum > 0) {
      Taro.hideLoading();
      setFetching({
        targetNum: 0,
        currentNum: 0,
      });
    }

    if (error) {
      Taro.hideLoading();
      Taro.showToast({
        title: '加载失败，即将尝试刷新',
        icon: 'none',
        duration: 2000,
      });
      setTimeout(() => {
        // 强制重启
        forceReload();
      }, 2000);
    }
  }, [fetching, error]);

  useEffect(() => {
    if (handbookData.isLoaded) {
      return;
    }
    switch (loadHandbookData.state) {
      case 'hasValue':
        setHandbookData(loadHandbookData.contents);
        oneFetchIsDone();
        break;
      case 'loading':
        oneFetchIsStarted();
        break;
      case 'hasError':
        oneFetchIsDone();
        setError(true);
        break;
    }
  }, [loadHandbookData]);

  // 强制刷新到最新的缓存数据
  const forceRefresh = () => {
    Taro.removeStorageSync('handbookDataPart1');
    Taro.removeStorageSync('handbookDataPart2');
    Taro.removeStorageSync('handbookDataPart3');
    Taro.removeStorageSync('handbookDataPart4');
    Taro.removeStorageSync('handbookDataPart5');
    setHandbookData(defaultHandbookData);
    setRefresh((prev) => prev + 1);
  };

  return {
    handbookData,
    fetching:
      fetching.targetNum > 0 && fetching.currentNum < fetching.targetNum,
    error,
    forceRefresh,
  };
};
