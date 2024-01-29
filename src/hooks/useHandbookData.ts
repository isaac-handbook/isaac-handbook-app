import { refreshHandBookData } from '@src/actions/refreshHandBookData';
import { atom, useRecoilState } from 'recoil';
import { HandBookData } from 'src/types/handbook';

const defaultHandbookData: HandBookData = {
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

export const useHandBookData = () => {
  const [handbookData, setHandbookData] = useRecoilState(handbookDataState);

  // 刷新图鉴数据（重新下载）
  const forceRefresh = async () => {
    setHandbookData(defaultHandbookData);
    const newHandbookData = await refreshHandBookData();
    setHandbookData(newHandbookData);
  };

  // 通过 type 和 id 获取图鉴数据
  const getItemDataById = (
    type: keyof Omit<HandBookData, 'extra' | 'chara' | 'version'>,
    id: string,
  ) => {
    return handbookData[type].find((item) => item.id === id);
  };

  return {
    handbookData,
    setHandbookData,
    forceRefresh,
    getItemDataById,
  };
};
