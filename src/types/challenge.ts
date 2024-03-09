import { Item } from './handbook';

/** 一个成就 */
export interface Challenge extends Item {
  /** 使用人物 */
  useChara?: string;
  /** 初始物品 */
  initialItems?: string;
  /** 是否有宝箱房 */
  hasTreasureRoom?: boolean;
  /** 是否有商店 */
  hasShop?: boolean;
  /** 目的地 */
  destination?: string;
  /** 特殊规则 */
  specialRule?: string;
}
