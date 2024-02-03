import { TopicMeta, Topic } from '@typers/exam';
import { Item } from '@typers/handbook';
import { generateCustomTopic } from './topicType/customTopic';
import { generateQualityTopic } from './topicType/qualityTopic';
import { generateUnlockTopic } from './topicType/unlockTopic';

const customTopicWeight = 0.55;
// const customTopicWeight = 0.65;
const unlockTopicWeight = 0.4;
// const unlockTopicWeight = 0.3;

interface Options {
  topicMeta: TopicMeta;
  item: Item;
  items: Item[];
}

export const generateStage3Topic = (options: Options): Topic | null => {
  const { item, topicMeta, items } = options;

  const weight = Math.random();

  // 生成一个 stage3 的 custom topic
  if (weight < customTopicWeight) {
    // if (weight < 0) {
    return generateCustomTopic({
      item,
      items,
      topicMeta,
      stage: 3,
    });
  }

  // 生成一个 stage3 的 unlock topic
  if (weight < customTopicWeight + unlockTopicWeight) {
    // if (weight < 1) {
    return generateUnlockTopic({
      item,
      items,
      optionCount: 2,
    });
  }

  // 生成一个 stage3 的 quality topic
  return generateQualityTopic({
    item,
    optionCount: 2,
  });
};
