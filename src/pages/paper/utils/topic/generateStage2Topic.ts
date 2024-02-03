import { TopicMeta, Topic } from '@typers/exam';
import { Item } from '@typers/handbook';
import { generateCustomTopic } from './topicType/customTopic';
import { generateChargeTopic } from './topicType/chargeTopic';
import { generatePoolTopic } from './topicType/poolTopic';
import { generateSuitTopic } from './topicType/suitTopic';

const customTopicWeight = 0.5;
// const customTopicWeight = 0.55;

interface Options {
  topicMeta: TopicMeta;
  item: Item;
  items: Item[];
}

export const generateStage2Topic = (options: Options): Topic | null => {
  const { item, topicMeta, items } = options;

  const weight = Math.random();

  // 生成一个 stage2 的 custom topic
  if (weight < customTopicWeight) {
    return generateCustomTopic({
      item,
      items,
      topicMeta,
      stage: 2,
    });
  }

  // 生成一个 stage2 的 suit topic
  if (weight < customTopicWeight + 0.2) {
    return generateSuitTopic({
      item,
    });
  }

  // 生成一个 stage2 的 charge topic
  if (weight < customTopicWeight + 0.4) {
    return generateChargeTopic({
      item,
    });
  }

  // 生成一个 stage2 的 pool topic
  return generatePoolTopic({
    item,
  });
};
