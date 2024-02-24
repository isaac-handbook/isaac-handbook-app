import { TopicMeta, Topic } from '@typers/exam';
import { Item } from '@typers/handbook';
import { generateCustomTopic } from './topicType/customTopic';
import { generateChargeTopic } from './topicType/chargeTopic';
import { generatePoolTopic } from './topicType/poolTopic';
import { generateSuitTopic } from './topicType/suitTopic';

// const customTopicWeight = 0.5;
const customTopicWeight = 1;

interface Options {
  topicMeta: TopicMeta;
  item: Item;
  items: Item[];
  customOnly?: boolean;
}

/** 随机生成 1 个 stage2 的题目 */
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
    })[0];
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

/** 生成当前 item 的所有 stage2 题目 */
export const generateAllStage2Topic = (options: Options): Topic[] => {
  const { item, items, topicMeta, customOnly } = options;

  const topics: Topic[] = [];

  // 生成 1 个 stage2 的 custom topic
  const customTopics = generateCustomTopic({
    item,
    items,
    topicMeta,
    stage: 2,
    all: true,
  });
  if (customTopics.length) {
    topics.push(...customTopics);
  }

  if (customOnly) {
    return topics;
  }

  // 生成 1 个 stage2 的 suit topic
  const suitTopic = generateSuitTopic({
    item,
  });
  if (suitTopic) {
    topics.push(suitTopic);
  }

  // 生成 1 个 stage2 的 charge topic
  const chargeTopic = generateChargeTopic({
    item,
  });
  if (chargeTopic) {
    topics.push(chargeTopic);
  }

  // 生成 1 个 stage2 的 pool topic
  const poolTopic = generatePoolTopic({
    item,
  });
  if (poolTopic) {
    topics.push(poolTopic);
  }

  return topics;
};
