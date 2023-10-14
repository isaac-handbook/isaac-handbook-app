import { useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

export const chargeTypeList = ['电池充能', '时间充能', '无充能', ''] as const;

export const unlockTypeList = ['需要解锁', '不需要解锁', ''] as const;

interface ItemSearchInfo {
  // 搜索关键字
  keyword: string;
  // 道具池过滤
  poolFilter: string;
  // 标签过滤
  tagFilter: string;
  // 道具质量
  qualityFilter: string;
  // 充能数量过滤。 chargeTypeList 的元素的类型
  chargeFilter: (typeof chargeTypeList)[number];
  // 是否要解锁
  unlockFilter: (typeof unlockTypeList)[number];
}

export const defaultItemSearchInfo: ItemSearchInfo = {
  keyword: '',
  poolFilter: '',
  tagFilter: '',
  qualityFilter: '',
  chargeFilter: '',
  unlockFilter: '',
};

export const itemSearchInfoState = atom<ItemSearchInfo>({
  key: 'itemSearchInfo',
  default: defaultItemSearchInfo,
});

export const useItemSearchInfo = () => {
  const [itemSearchInfo, setItemSearchInfo] =
    useRecoilState(itemSearchInfoState);

  const resetFilter = () => {
    setItemSearchInfo({
      keyword: itemSearchInfo.keyword,
      poolFilter: '',
      tagFilter: '',
      qualityFilter: '',
      chargeFilter: '',
      unlockFilter: '',
    });
  };

  // 当前是否有过滤条件
  const hasFilterInfo = useMemo(() => {
    return Object.values(itemSearchInfo).some((value) => value !== '');
  }, [itemSearchInfo]);

  return {
    itemSearchInfo,
    hasFilterInfo,
    setItemSearchInfo,
    resetFilter,
  };
};
