import { Topic } from '@typers/exam';
import { Item } from '@typers/handbook';
import { randomAnswer } from '../../randomAnswer';
import { chargeLevelBgMap } from '@components/ChargeBar';

// 所有可能电池充能数量
const allBatteryCharge = Object.keys(chargeLevelBgMap).map((key) =>
  Number(key),
);

interface Params {
  item: Item;
  optionCount?: number;
}

/** 生成一个基于 充能类型和数量 的 stage2 试题 */
export const generateChargeTopic = (params: Params): Topic | null => {
  const { item, optionCount = 2 } = params;

  const { charge } = item;

  if (!charge || charge === '/') {
    return null;
  }

  // 时间充能
  if (charge.includes('秒')) {
    const seconds = Number(charge.replace('秒', ''));
    if (!seconds || isNaN(seconds)) {
      return null;
    }
    const options = randomAnswer(
      seconds,
      [seconds / 2, seconds * 2, seconds * 4],
      optionCount,
    );

    return {
      itemId: item.id,
      itemType: item.type,
      stage: 2,
      type: 'charge',
      question: '该道具充能需要多少秒？',
      ...options,
    };
  }

  // 电池充能
  const battery = Number(charge.replace(',一次性使用', ''));
  if (!battery || isNaN(battery)) {
    return null;
  }
  // 从 allBatteryCharge 中随机选出 2 个不同的电池充能数量作为 worngList
  const wrongList = allBatteryCharge
    .filter((it) => it !== battery)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const options = randomAnswer(battery, wrongList, optionCount);

  return {
    itemId: item.id,
    itemType: item.type,
    stage: 2,
    type: 'charge',
    question: '该道具的充能是多少格？',
    ...options,
  };
};
