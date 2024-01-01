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

  return {
    handbookData,
    setHandbookData,
    forceRefresh,
  };
};
