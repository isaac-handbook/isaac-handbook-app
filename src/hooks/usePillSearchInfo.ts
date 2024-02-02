import { atom, useRecoilState } from 'recoil';

interface PillSearchInfo {
  /** 搜索关键字 */
  keyword: string;
}

export const defaultPillSearchInfo: PillSearchInfo = {
  keyword: '',
};

export const pillSearchInfoState = atom<PillSearchInfo>({
  key: 'pillSearchInfo',
  default: defaultPillSearchInfo,
});

export const usePillSearchInfo = () => {
  const [pillSearchInfo, setPillSearchInfo] =
    useRecoilState(pillSearchInfoState);

  const resetFilter = () => {
    setPillSearchInfo({
      keyword: pillSearchInfo.keyword,
    });
  };

  return {
    pillSearchInfo,
    setPillSearchInfo,
    resetFilter,
  };
};
