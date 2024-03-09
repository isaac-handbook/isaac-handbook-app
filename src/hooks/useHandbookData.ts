import { refreshHandBookData } from '@src/actions/handbook/refreshHandBookData';
import { atom, useRecoilState } from 'recoil';
import { HandBookData } from 'src/types/handbook';

const defaultHandbookData: HandBookData = {
  items: [],
  trinkets: [],
  cards: [],
  pills: [],
  chara: {},
  extra: { tagInfo: {}, table: {}, revive: [] } as any,
  achieve: [],
};

export const handbookDataState = atom<HandBookData>({
  key: 'handbookData',
  default: defaultHandbookData,
});

export const useHandBookData = () => {
  const [handbookData, setHandbookData] = useRecoilState(handbookDataState);

  // 刷新图鉴数据（重新下载）
  const forceRefresh = async () => {
    setHandbookData(defaultHandbookData);
    const newHandbookData = await refreshHandBookData();
    setHandbookData(newHandbookData);
  };

  // 通过 type 和 id 获取图鉴数据
  const getItemDataById = <
    T extends keyof Omit<HandBookData, 'extra' | 'chara' | 'version'>,
  >(
    type: T,
    id: string,
  ) => {
    return handbookData[type].find(
      (item) => item.id === id,
    ) as HandBookData[T][0];
  };

  const updateSingleHandbookState = <T extends keyof HandBookData>(
    key: T,
    value: HandBookData[T],
  ) => {
    setHandbookData({
      ...handbookData,
      [key]: value,
    });
  };

  return {
    handbookData,
    setHandbookData,
    forceRefresh,
    getItemDataById,
    updateSingleHandbookState,
  };
};
