import { ColorType } from '@hooks/useItemSearchInfo';
import { TableColumnProps } from '@nutui/nutui-react-taro/dist/types/packages/table/types';

export type ItemType = 'item' | 'trinket' | 'card' | 'pill' | 'chara';

// 人工打标的道具类型
export type ItemClass =
  | 'dmg'
  | 'tears'
  | 'shots'
  | 'range'
  | 'luck'
  | 'hp'
  | 'speed'
  | 'auto-spec'
  | 'use-spec';

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
  extra: string[];
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
  type: ItemType;
  // 别名
  alias?: string[];
  // 颜色
  colors: ColorType[];
  // 类别
  classes: string[];
}

export interface HandBookData {
  version?: number;
  items: Item[];
  trinkets: Item[];
  cards: Item[];
  pills: Item[];
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
  };
  chara: Record<string, Chara>;
}

// 单个角色信息
export interface CharaInfo {
  // 中文名称
  nameZh: string;
  // 英文名称
  nameEn: string;
  // 血量
  health: string;
  // 移速
  speed: string;
  // 射速
  tears: string;
  // 伤害
  damage: string;
  // 射程
  range: string;
  // 弹速
  shotSpeed: string;
  // 幸运
  luck: string;
  // 解锁条件
  unlock: string;
}

export interface Chara extends Item {
  // 名称
  nameZh: string;
  // 角色信息列表
  infoList: CharaInfo[];
}
