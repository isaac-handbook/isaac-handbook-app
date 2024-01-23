import { Topic } from '@typers/exam';
import { Item } from '@typers/handbook';
import { randomAnswer } from '../../randomAnswer';
import _ from 'lodash';

// 所有品质
const allQuality = ['0', '1', ' 2', '3', '4'];

interface Params {
  item: Item;
  optionCount?: number;
}

/** 生成一个基于 道具等级（品质） 的 stage2 试题 */
export const generateQualityTopic = (params: Params): Topic | null => {
  const { item, optionCount = 3 } = params;

  const { quality } = item;

  // 如果 quality 不包含在 allQuality 中，直接返回 null
  if (!allQuality.includes(quality)) {
    return null;
  }

  // 从 allQuality 中随机找出 optionCount 个错误的答案
  const wrongList = _.shuffle(allQuality.filter((it) => it !== quality)).slice(
    0,
    optionCount - 1,
  );

  const options = randomAnswer(quality, wrongList, optionCount);
  return {
    itemId: item.id,
    itemType: item.type,
    stage: 3,
    type: 'quality',
    question: '该道具的品质是？',
    ...options,
  };
};
