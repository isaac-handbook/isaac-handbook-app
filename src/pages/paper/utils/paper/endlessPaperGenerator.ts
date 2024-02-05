import { TopicMeta, Topic } from '../../../../types/exam';
import { Item } from '../../../../types/handbook';
import * as _ from 'lodash';
import { generateAllStage1Topic } from '../topic/generateStage1Topic';
import { generateAllStage2Topic } from '../topic/generateStage2Topic';
import { generateAllStage3Topic } from '../topic/generateStage3Topic';

interface Options {
  items: Item[];
  topicMetaList: TopicMeta[];
  /** 生成的题目包含的难度 */
  stageList: number[];
}

/**
 * 生成一份无尽模式的试卷
 * 生成 topicMetaList 中每个 item 每个 stage 的所有 type 的题目
 */
export const endlessPaperGenerator = (options: Options): Topic[] => {
  const { items, topicMetaList, stageList = [1, 2, 3] } = options;
  const otpTopics: Topic[] = [];

  for (const topicMeta of topicMetaList) {
    const item = items.find((item) => item.id === String(topicMeta.id));
    if (!item) continue;
    // 生成 stage1 的题目
    if (stageList.includes(1)) {
      const topics = generateAllStage1Topic({
        topicMeta,
        item,
        items,
      });
      if (topics.length) {
        otpTopics.push(...topics);
      }
    }
    // 生成 stage2 的题目
    if (stageList.includes(2)) {
      const topics = generateAllStage2Topic({
        topicMeta,
        item,
        items,
      });
      if (topics.length) {
        otpTopics.push(...topics);
      }
    }
    // 生成 stage3 的题目
    if (stageList.includes(3)) {
      const topics = generateAllStage3Topic({
        topicMeta,
        item,
        items,
      });
      if (topics.length) {
        otpTopics.push(...topics);
      }
    }
  }

  // 打乱一下
  return _.shuffle(otpTopics);
};
