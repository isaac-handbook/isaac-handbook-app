import { TopicMeta, Topic } from '../../../../types/exam';
import { Item } from '../../../../types/handbook';
import * as _ from 'lodash';
import { generateStage1Topic } from '../topic/generateStage1Topic';
import { generateStage2Topic } from '../topic/generateStage2Topic';
import { generateStage3Topic } from '../topic/generateStage3Topic';

interface Options {
  items: Item[];
  topicMetaList: TopicMeta[];
  /** 生成的题目数量与难易分布 */
  condition: {
    stage: 1 | 2 | 3;
    count: number;
  }[];
  /** 结果是否要按照 stage 从小到大排序 */
  sort?: boolean;
}

/** 生成一份考卷 */
export const paperGenerator = (options: Options): Topic[] => {
  const { items, topicMetaList, condition, sort = true } = options;

  const oparateCondition = _.cloneDeep(condition);

  const otpTopics: Topic[] = [];

  for (const topicMeta of _.shuffle(topicMetaList)) {
    // 如果当前 otpTopics 已经有这个 item 了，则返回 null
    if (otpTopics.some((topic) => topic.itemId === String(topicMeta.id))) {
      continue;
    }
    const item = items.find((item) => item.id === String(topicMeta.id));
    if (!item) continue;
    // 如果 stage1 的题目还没满，生成 stage1 的题目
    if (oparateCondition[0].count > 0) {
      const topic = generateStage1Topic({
        topicMeta,
        item,
        items,
      });
      if (topic) {
        otpTopics.push(topic);
        oparateCondition[0].count--;
        continue;
      }
    }
    // 如果 stage2 的题目还没满，生成 stage2 的题目
    if (oparateCondition[1].count > 0) {
      const topic = generateStage2Topic({
        topicMeta,
        item,
        items,
      });
      if (topic) {
        otpTopics.push(topic);
        oparateCondition[1].count--;
        continue;
      }
    }
    // 如果 stage3 的题目还没满，生成 stage3 的题目
    if (oparateCondition[2].count > 0) {
      const topic = generateStage3Topic({
        topicMeta,
        item,
        items,
      });
      if (topic) {
        otpTopics.push(topic);
        oparateCondition[2].count--;
        continue;
      }
    }
  }

  if (sort) {
    // 将最终结果按照 stage 从小到大排序
    otpTopics.sort((a, b) => a.stage - b.stage);
  }

  return otpTopics;
};
