import { TopicMeta, Topic } from '@typers/exam';
import { Item } from '@typers/handbook';
import { generateCustomTopic } from './topicType/customTopic';
import { generateQualityTopic } from './topicType/qualityTopic';
import { generateUnlockTopic } from './topicType/unlockTopic';

interface Options {
  topicMeta: TopicMeta;
  item: Item;
  items: Item[];
}

export const generateStage3Topic = (options: Options): Topic | null => {
  const { item, topicMeta, items } = options;

  const weight = Math.random();

  // 生成一个 stage3 的 custom topic
  if (weight < 0.55) {
    // if (weight < 0) {
    return generateCustomTopic({
      item,
      items,
      topicMeta,
      stage: 3,
    });
  }

  // 生成一个 stage3 的 unlock topic
  if (weight < 0.85) {
    // if (weight < 1) {
    return generateUnlockTopic({
      item,
      items,
    });
  }

  // 生成一个 stage3 的 quality topic
  return generateQualityTopic({
    item,
  });
};
