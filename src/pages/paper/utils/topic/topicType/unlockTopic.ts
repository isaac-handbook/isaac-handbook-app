import { Topic } from '@typers/exam';
import { Item } from '@typers/handbook';
import { randomAnswer } from '../../randomAnswer';
import _ from 'lodash';

interface Params {
  items: Item[];
  item: Item;
  optionCount?: number;
}

/** 生成一个基于 unlock 的 stage3 试题 */
export const generateUnlockTopic = (params: Params): Topic | null => {
  const { items, item, optionCount = 3 } = params;

  // 如果 item 不是解锁道具，直接返回 null
  if (!item.unlock) {
    return null;
  }

  // 从 items 中随机找出 optionCount 个错误的答案
  const wrongList = _.shuffle(items)
    .filter((it) => it.id !== item.id)
    .filter((it) => it.unlock)
    .filter((it) => it.unlock !== item.unlock)
    .map((it) => it.unlock)
    .slice(0, optionCount - 1);

  const options = randomAnswer(item.unlock, wrongList, optionCount);

  return {
    itemId: item.id,
    itemType: item.type,
    stage: 3,
    type: 'unlock',
    question: '该道具的解锁条件是？',
    ...options,
  };
};
