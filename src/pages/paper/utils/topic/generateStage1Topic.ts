import { TopicMeta, Topic } from '@typers/exam';
import { Item } from '@typers/handbook';
import { generateDescTopic } from './topicType/descTopic';
import { generateCustomTopic } from './topicType/customTopic';

// const customTopicWeight = 0.65;
const customTopicWeight = 0.8;

interface Options {
  topicMeta: TopicMeta;
  item: Item;
  items: Item[];
}

/** 随机生成 1 个 stage1 的题目 */
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

  // 50%概率是2，50%概率是3
  const optionCount = Math.random() > 0.5 ? 2 : 3;

  // 生成一个 stage1 的 desc topic
  const topic = generateDescTopic({
    item,
    items,
    optionCount,
  });
  return topic;
};

/** 生成当前 item 的所有 stage1 题目 */
export const generateAllStage1Topic = (options: Options): Topic[] => {
  const { item, items, topicMeta } = options;

  const topics: Topic[] = [];

  // 生成 1 个 stage1 的 custom topic
  const customTopic = generateCustomTopic({
    item,
    items,
    topicMeta,
    stage: 1,
  });
  if (customTopic) {
    topics.push(customTopic);
  }

  // 生成 1 个 stage1 的 desc topic
  const descTopic = generateDescTopic({
    item,
    items,
  });
  if (descTopic) {
    topics.push(descTopic);
  }

  return topics;
};
