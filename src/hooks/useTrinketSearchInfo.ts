import { atom, useRecoilState } from 'recoil';
import { ColorType } from './useItemSearchInfo';
import { useMemo } from 'react';

interface TrinketSearchInfo {
  // 搜索关键字
  keyword: string;
  // 过滤中的颜色
  filteredColors: ColorType[];
}

export const defaultTrinketSearchInfo: TrinketSearchInfo = {
  keyword: '',
  filteredColors: [],
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
      ...defaultTrinketSearchInfo,
      keyword: trinketSearchInfo.keyword,
    });
  };

  const updateTrinketSearchInfo = (
    newTrinketSearchInfo: Partial<TrinketSearchInfo>,
  ) => {
    setTrinketSearchInfo({
      ...trinketSearchInfo,
      ...newTrinketSearchInfo,
    });
  };

  // 当前是否有过滤条件
  const hasFilterInfo = useMemo(() => {
    if (trinketSearchInfo.filteredColors.length > 0) {
      return true;
    }
    // 遍历所有类型为 string 的属性，如果有值，就返回 true
    for (const key in trinketSearchInfo) {
      if (
        typeof trinketSearchInfo[key] === 'string' &&
        trinketSearchInfo[key]
      ) {
        return true;
      }
    }
  }, [trinketSearchInfo]);

  return {
    trinketSearchInfo,
    setTrinketSearchInfo,
    resetFilter,
    updateTrinketSearchInfo,
    hasFilterInfo,
  };
};
