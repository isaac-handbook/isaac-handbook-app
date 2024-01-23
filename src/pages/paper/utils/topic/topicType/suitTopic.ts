import { Topic } from '@typers/exam';
import { Item } from '@typers/handbook';
import { randomAnswer } from '../../randomAnswer';
import suitList from '@data/suit.json';
import _ from 'lodash';
import { convertTagToSuit } from '@pages/index/components/ItemFilter/TagFilter';

// 所有套装
const allSuitNames = suitList.map((it) => it.name);

interface Params {
  item: Item;
  optionCount?: number;
}

/** 生成一个基于 套装 的 stage2 试题 */
export const generateSuitTopic = (params: Params): Topic | null => {
  const { item, optionCount = 3 } = params;

  const { tags } = item;

  if (!tags?.length) {
    return null;
  }

  // 如果 tags 中没有 allSuitNames 中的值，直接返回 null
  const suitNames = tags.filter((it) => allSuitNames.includes(it));
  if (!suitNames.length) {
    return null;
  }

  // suitNames 按说只有一个。如果有多个，则 warn
  if (suitNames.length > 1) {
    console.warn(`有多个套装标签`, item);
    return null;
  }

  const curSuitName = suitNames[0];
  // 从 allSuitNames 中随机找出 optionCount 个错误的答案
  const wrongList = _.shuffle(allSuitNames.filter((it) => it !== curSuitName))
    .slice(0, optionCount - 1)
    .map((it) => convertTagToSuit[it]);

  const correct = convertTagToSuit[curSuitName];

  const options = randomAnswer(correct, wrongList, optionCount);
  return {
    itemId: item.id,
    itemType: item.type,
    stage: 2,
    type: 'suit',
    question: '该道具属于哪个套装？',
    ...options,
  };
};
