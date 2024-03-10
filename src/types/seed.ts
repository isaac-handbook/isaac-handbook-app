import { Item } from './handbook';

/** 一个种子 */
export interface Seed extends Item {
  /** 种子 code */
  seedCode: string;
  /** 种子类型 */
  seedType: string;
  /** 是否支持解锁成就 */
  supportAchieve: boolean;
}
