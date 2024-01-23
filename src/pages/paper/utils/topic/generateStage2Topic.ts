import { TopicMeta, Topic } from '@typers/exam';
import { Item } from '@typers/handbook';
import { generateCustomTopic } from './topicType/customTopic';
import { generateChargeTopic } from './topicType/chargeTopic';
import { generatePoolTopic } from './topicType/poolTopic';
import { generateSuitTopic } from './topicType/suitTopic';

interface Options {
  topicMeta: TopicMeta;
  item: Item;
  items: Item[];
}

export const generateStage2Topic = (options: Options): Topic | null => {
  const { item, topicMeta, items } = options;

  const weight = Math.random();

  // 生成一个 stage2 的 custom topic
  if (weight < 0.5) {
    return generateCustomTopic({
      item,
      items,
      topicMeta,
      stage: 2,
    });
  }

  // 生成一个 stage2 的 suit topic
  if (weight < 0.75) {
    return generateSuitTopic({
      item,
    });
  }

  // 生成一个 stage2 的 charge topic
  if (weight < 0.85) {
    return generateChargeTopic({
      item,
    });
  }

  // 生成一个 stage2 的 pool topic
  return generatePoolTopic({
    item,
  });
};
