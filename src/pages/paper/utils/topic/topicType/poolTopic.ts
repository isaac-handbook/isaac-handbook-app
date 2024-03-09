import { Topic } from '@typers/exam';
import { Item } from '@typers/handbook';
import { randomAnswer } from '../../randomAnswer';
import _ from 'lodash';

// 所有可用于试题的道具池类型
const allPoolType = [
  '恶魔房',
  '天使房',
  '宝箱房',
  '图书馆',
  '商店',
  '星象房',
  '诅咒房',
  '隐藏房',
];

interface Params {
  item: Item;
  optionCount?: number;
}

/** 生成一个基于 道具池 的 stage2 试题 */
export const generatePoolTopic = (params: Params): Topic | null => {
  const { item, optionCount = 3 } = params;
  const { pools } = item;
  // 过滤掉所有 pools 中不包含于 allPoolType 的内容
  const filterPools = pools?.filter((pool) => allPoolType.includes(pool));
  if (!filterPools?.length) return null;

  // 从 filterPools 中随机选取一个作为正确答案
  const correctAnswer =
    filterPools[Math.floor(Math.random() * filterPools.length)];
  // 在 allPoolType 中随机选取  个 不包含在 filterPools 的选项，作为错误答案
  const errorOptions = _.shuffle(
    allPoolType.filter((pool) => !filterPools.includes(pool)),
  ).slice(0, optionCount - 1);

  // 错误答案不够
  if (errorOptions.length !== optionCount - 1) return null;

  const options = randomAnswer(correctAnswer, errorOptions, optionCount);
  return {
    itemId: item.id,
    itemType: item.type,
    stage: 2,
    type: 'pool',
    question: '该道具可以在哪个房间中获得？',
    ...options,
  };
};
