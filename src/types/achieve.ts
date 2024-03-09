/** 一个成就 */
export interface Achieve {
  /** 成就 ID */
  id: string;
  /** 中文名称 */
  nameZh: string;
  /** 英文名称 */
  nameEn: string;
  /** 图标坐标 */
  iconPosition: string;
  /** 成就描述 中文 */
  descZh: string;
  /** 解锁条件 */
  unlock: string;
  /** 解锁物品 */
  unlockItem: string;
  /** 成就类型 */
  type: number;
  /** 临时数据，用于搜索 */
  tmp?: string;
}

export const achieveTypeMap = {
  重生成就: 1,
  胎衣成就: 2,
  '胎衣†成就': 3,
  忏悔成就: 4,
} as const;

export const achieveTypeMapRe = {
  1: '重生成就',
  2: '胎衣成就',
  3: '胎衣†成就',
  4: '忏悔成就',
};
