import { useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

export const chargeTypeList = ['电池充能', '时间充能', '无充能', ''] as const;

export const unlockTypeList = ['需要解锁', '不需要解锁', ''] as const;

export const colorTypeList = [
  'whi',
  'bla',
  'red',
  'bro',
  'rou',
  'yel',
  'gre',
  'blu',
  'pur',
] as const;

export type ColorType = (typeof colorTypeList)[number];

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
  // 是否打开颜色过滤器
  openColorFilter: boolean;
  // 过滤中的颜色
  filteredColors: ColorType[];
}

export const defaultItemSearchInfo: ItemSearchInfo = {
  keyword: '',
  poolFilter: '',
  tagFilter: '',
  qualityFilter: '',
  chargeFilter: '',
  unlockFilter: '',
  openColorFilter: true,
  filteredColors: [],
};

export const itemSearchInfoState = atom<ItemSearchInfo>({
  key: 'itemSearchInfo',
  default: defaultItemSearchInfo,
});

export const useItemSearchInfo = () => {
  const [itemSearchInfo, setItemSearchInfo] =
    useRecoilState(itemSearchInfoState);

  const resetFilter = ({ refreshKeyword = false }) => {
    setItemSearchInfo({
      ...defaultItemSearchInfo,
      keyword: refreshKeyword ? '' : itemSearchInfo.keyword,
      openColorFilter: itemSearchInfo.openColorFilter,
    });
  };

  // 当前是否有过滤条件
  const hasFilterInfo = useMemo(() => {
    if (itemSearchInfo.filteredColors.length > 0) {
      return true;
    }
    // 遍历所有类型为 string 的属性，如果有值，就返回 true
    for (const key in itemSearchInfo) {
      if (typeof itemSearchInfo[key] === 'string' && itemSearchInfo[key]) {
        return true;
      }
    }
  }, [itemSearchInfo]);

  const updateItemSearchInfo = (newItemSearchInfo: Partial<ItemSearchInfo>) => {
    setItemSearchInfo({
      ...itemSearchInfo,
      ...newItemSearchInfo,
    });
  };

  return {
    itemSearchInfo,
    hasFilterInfo,
    setItemSearchInfo,
    updateItemSearchInfo,
    resetFilter,
  };
};
