import { ItemType } from './handbook';

// 题目等级
export type TopicStage = 1 | 2 | 3;

// 题目类型
export type TopicType =
  | 'desc'
  | 'charge'
  | 'suit'
  | 'pool'
  | 'quality'
  | 'unlock'
  | 'custom';

export interface RawTopic {
  stage: TopicStage;
  value: string;
  wrongList: string[];
}

export interface TopicMeta {
  stage: TopicStage;
  type: ItemType;
  id: string;
  questions: RawTopic[];
}

export type ExamRawData = Record<string, TopicMeta[]>;

export interface Topic {
  // 当前 item 的 ID
  itemId: string;
  // 当前 item 的类型
  itemType: Omit<ItemType, 'chara'>;
  // 当前题目的 stage
  stage: TopicStage;
  // 题目类型
  type: TopicType;
  // 题目
  question: string;
  // 选项
  options: string[];
  // 正确答案，选择中的索引
  answer: number;
}

/** 用户的答案，为 null 即为超时了，一定是错误 */
export type UserAnswer = number | null;
