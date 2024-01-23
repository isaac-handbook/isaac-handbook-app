import { Topic } from '@typers/exam';
import { Item } from '@typers/handbook';
import { randomAnswer } from '../../randomAnswer';
import _ from 'lodash';

interface Params {
  items: Item[];
  item: Item;
  optionCount?: number;
}

/** 生成一个基于 description 的 stage1 试题 */
export const generateDescTopic = (params: Params): Topic | null => {
  const { items, item, optionCount = 3 } = params;

  const itemClasses = item.classes;
  if (!itemClasses?.length) return null;

  // 寻找 items 中 classess 与 itemClasses 不相同的 item
  const descItems = items.filter((it) => {
    const itemClasses = it.classes.join(',');
    if (!itemClasses?.length) return false;
    if (itemClasses === item.classes.join(',')) return false;
    return true;
  });

  // 打乱 descItems 的顺序，并随机选出 optionCount 个 classes 不同的
  const wrongList = _.shuffle(descItems)
    .filter((it) => it.classes.length)
    .slice(0, optionCount - 1)
    .map((it) => it.description);

  const optionsAndAnswer = randomAnswer(
    item.description,
    wrongList,
    optionCount,
  );

  const topic: Topic = {
    itemId: item.id,
    itemType: item.type,
    stage: 1,
    type: 'desc',
    question: '该道具的作用是：',
    ...optionsAndAnswer,
  };

  return topic;
};
