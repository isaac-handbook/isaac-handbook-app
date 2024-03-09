import { ColorType } from '@hooks/useItemSearchInfo';
import { TableColumnProps } from '@nutui/nutui-react-taro/dist/types/packages/table/types';
import { Achieve } from './achieve';
import { Chara } from './chara';
import { Curse } from './curse';

export type ItemType =
  | 'item'
  | 'trinket'
  | 'card'
  | 'pill'
  | 'chara'
  | 'achieve'
  | 'curse';

export interface ItemGridVirtualListItem {
  type: 'items' | 'component';
  items?: Item[];
  component?: React.ReactNode;
}

export interface ItemListVirtualListItem {
  type: 'item' | 'component';
  item?: any;
  component?: React.ReactNode;
}

/** 道具列表 */
export type BriefItemList = Array<BriefItem>;

/** 单个道具 */
export type BriefItem = {
  /** 道具中文名称 */
  nameZh: string;
  /** 道具英文名称 */
  nameEn?: string;
  /** 道具ID */
  id: string;
  /** 图标坐标 */
  iconPosition: string;
  /** 品质 1-4 */
  quality?: string;
  /** 充电格数 */
  charge?: string;
  /** 简要介绍 */
  description?: string;
};

export type ItemDetailNode = {
  level: number;
  extra?: string[];
  value?: string;
  children?: ItemDetailNode[];
};

export interface Item extends BriefItem {
  /** 详细介绍 */
  content?: ItemDetailNode[];
  /** 道具标签 */
  tags?: string[];
  /** 道具池信息 */
  pools?: string[];
  /** 解锁条件 */
  unlock?: string;
  /** 官方简介-中文 */
  descZh?: string;
  /** 官方简介-英文 */
  descEn?: string;
  /** 是否显示 */
  show?: boolean;
  /** 类型 */
  type: ItemType;
  /** 别名 */
  alias?: string[];
  /** 颜色 */
  colors?: ColorType[];
}

export interface HandBookData {
  version?: number;
  items: Item[];
  trinkets: Item[];
  cards: Item[];
  pills: Item[];
  achieve: Achieve[];
  extra: {
    suitList: { name: string }[];
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
    bossMark: {
      columns: TableColumnProps[];
      data: any[];
    };
    diceRoom: {
      columns: TableColumnProps[];
      data: any[];
    };
    sacrificeRoom: {
      columns: TableColumnProps[];
      data: any[];
    };
    curse: Curse[];
  };
  chara: Record<string, Chara>;
}

export * from './achieve';
export * from './chara';
export * from './curse';
