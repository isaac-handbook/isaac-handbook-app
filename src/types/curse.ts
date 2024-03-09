import { ItemDetailNode } from './handbook';

export interface Curse {
  /** 中文名称 */
  nameZh: string;
  /** 英文名称 */
  nameEn: string;
  /** 内容 */
  content: ItemDetailNode[];
}
