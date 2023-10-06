import { atom, useRecoilState } from 'recoil';

interface TrinketSearchInfo {
  // 搜索关键字
  keyword: string;
}

export const defaultTrinketSearchInfo: TrinketSearchInfo = {
  keyword: '',
};

export const trinketSearchInfoState = atom<TrinketSearchInfo>({
  key: 'trinketSearchInfo',
  default: defaultTrinketSearchInfo,
});

export const useTrinketSearchInfo = () => {
  const [trinketSearchInfo, setTrinketSearchInfo] = useRecoilState(
    trinketSearchInfoState,
  );

  const resetFilter = () => {
    setTrinketSearchInfo({
      keyword: trinketSearchInfo.keyword,
    });
  };

  return {
    trinketSearchInfo,
    setTrinketSearchInfo,
    resetFilter,
  };
};
