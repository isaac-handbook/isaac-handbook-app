import { TableColumnProps } from '@nutui/nutui-react-taro/dist/types/packages/table/types';

export type ItemType = 'item' | 'trinket' | 'card' | 'pill';

export interface ItemGridVirtualListItem {
  type: 'items' | 'component';
  items?: Item[];
  component?: React.ReactNode;
}

export interface ItemListVirtualListItem {
  type: 'item' | 'component';
  item?: Item;
  component?: React.ReactNode;
}

// 道具列表
export type BriefItemList = Array<BriefItem>;

// 单个道具
export type BriefItem = {
  // 道具中文名称
  nameZh: string;
  // 道具英文名称
  nameEn: string;
  // 道具ID
  id: string;
  // 图标坐标
  iconPosition: string;
  // 品质 1-4
  quality: string;
  // 充电格数
  charge: string;
  // 简要介绍
  description: string;
};

export type ItemDetailNode = {
  level: number;
  value: string;
  children: ItemDetailNode[];
};

export interface Item extends BriefItem {
  // 详细介绍
  content: ItemDetailNode[];
  // 道具标签
  tags: string[];
  // 道具池信息
  pools: string[];
  // 解锁条件
  unlock: string;
  // 官方简介-中文
  descZh: string;
  // 官方简介-英文
  descEn: string;
  // 是否显示
  show?: boolean;
  // 类型
  type: 'item' | 'trinket' | 'card' | 'pill';
}

export interface HandBookData {
  isLoaded: boolean;
  items: Item[];
  trinkets: Item[];
  cards: Item[];
  pills: Item[];
  extra: {
    tagInfo: {
      [key: string]: string[];
    };
    table: {
      [key: string]: {
        columns: TableColumnProps[];
        data: any[];
      };
    };
    revive: string[];
  };
}
