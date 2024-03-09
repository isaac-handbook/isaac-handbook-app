import { Item } from './handbook';

/** 单个角色信息 */
export interface CharaInfo {
  /** 中文名称 */
  nameZh: string;
  /** 英文名称 */
  nameEn: string;
  /** 血量 */
  health: string;
  /** 移速 */
  speed: string;
  /** 射速 */
  tears: string;
  /** 伤害 */
  damage: string;
  /** 射程 */
  range: string;
  /** 弹速 */
  shotSpeed: string;
  /** 幸运 */
  luck: string;
  /** 解锁条件 */
  unlock: string;
}

export interface Chara extends Item {
  // 名称
  nameZh: string;
  // 角色信息列表
  infoList: CharaInfo[];
}
