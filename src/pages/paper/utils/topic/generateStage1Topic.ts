import { TopicMeta, Topic } from '@typers/exam';
import { Item } from '@typers/handbook';
import { generateDescTopic } from './topicType/descTopic';
import { generateCustomTopic } from './topicType/customTopic';

// const customTopicWeight = 0.65;
const customTopicWeight = 0.85;

interface Options {
  topicMeta: TopicMeta;
  item: Item;
  items: Item[];
}

export const generateStage1Topic = (options: Options): Topic | null => {
  const { item, topicMeta, items } = options;

  const weight = Math.random();

  // 生成一个 stage1 的 custom topic
  if (weight < customTopicWeight) {
    const topic = generateCustomTopic({
      item,
      items,
      topicMeta,
      stage: 1,
    });
    return topic;
  }

  // 生成一个 stage1 的 desc topic
  const topic = generateDescTopic({
    item,
    items,
  });
  return topic;
};
