import { useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

interface AchieveSearchInfo {
  /** 搜索关键字 */
  keyword: string;
  /** 解锁的物品类型 */
  unlockItemType: string;
  /** 成就的游戏版本 */
  achieveType: string;
  /** 相关角色 */
  relatedChara: string;
}

export const defaultAchieveSearchInfo: AchieveSearchInfo = {
  keyword: '',
  unlockItemType: '',
  achieveType: '',
  relatedChara: '',
};

export const achieveSearchInfoState = atom<AchieveSearchInfo>({
  key: 'achieveSearchInfo',
  default: defaultAchieveSearchInfo,
});

export const useAchieveSearchInfo = () => {
  const [achieveSearchInfo, setAchieveSearchInfo] = useRecoilState(
    achieveSearchInfoState,
  );

  const resetFilter = () => {
    setAchieveSearchInfo({
      ...defaultAchieveSearchInfo,
      keyword: achieveSearchInfo.keyword,
    });
  };

  // 当前是否有过滤条件
  const hasFilterInfo = useMemo(() => {
    // 遍历所有类型为 string 的属性，如果有值，就返回 true
    for (const key in achieveSearchInfo) {
      if (
        typeof achieveSearchInfo[key] === 'string' &&
        achieveSearchInfo[key]
      ) {
        return true;
      }
    }
  }, [achieveSearchInfo]);

  const updateAchieveSearchInfo = (
    newItemSearchInfo: Partial<AchieveSearchInfo>,
  ) => {
    setAchieveSearchInfo({
      ...achieveSearchInfo,
      ...newItemSearchInfo,
    });
  };

  return {
    achieveSearchInfo,
    setAchieveSearchInfo,
    resetFilter,
    hasFilterInfo,
    updateAchieveSearchInfo,
  };
};
