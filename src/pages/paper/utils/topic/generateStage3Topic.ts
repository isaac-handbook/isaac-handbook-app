import { TopicMeta, Topic } from '@typers/exam';
import { Item } from '@typers/handbook';
import { generateCustomTopic } from './topicType/customTopic';
import { generateQualityTopic } from './topicType/qualityTopic';
import { generateUnlockTopic } from './topicType/unlockTopic';

const customTopicWeight = 0.55;
// const customTopicWeight = 1;
const unlockTopicWeight = 0.35;

interface Options {
  topicMeta: TopicMeta;
  item: Item;
  items: Item[];
  customOnly?: boolean;
}

/** 随机生成 1 个 stage3 的题目 */
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
    })[0];
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

/** 生成当前 item 的所有 stage3 题目 */
export const generateAllStage3Topic = (options: Options): Topic[] => {
  const { item, items, topicMeta, customOnly } = options;

  const topics: Topic[] = [];

  // 生成所有 stage3 的 custom topic
  const customTopics = generateCustomTopic({
    item,
    items,
    topicMeta,
    stage: 3,
    all: true,
  });
  if (customTopics.length) {
    topics.push(...customTopics);
  }

  if (customOnly) {
    return topics;
  }

  // 生成 1 个 stage3 的 unlock topic
  const unlockTopic = generateUnlockTopic({
    item,
    items,
    optionCount: 2,
  });
  if (unlockTopic) {
    topics.push(unlockTopic);
  }

  // 生成 1 个 stage3 的 quality topic
  const qualityTopic = generateQualityTopic({
    item,
    optionCount: 2,
  });
  if (qualityTopic) {
    topics.push(qualityTopic);
  }

  return topics;
};
