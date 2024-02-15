import { TopicMeta, Topic } from '../../../../types/exam';
import { Item } from '../../../../types/handbook';
import * as _ from 'lodash';
import { generateStage1Topic } from '../topic/generateStage1Topic';
import { generateStage2Topic } from '../topic/generateStage2Topic';
import { generateStage3Topic } from '../topic/generateStage3Topic';
import { examSeasonConfig } from '@src/config/config.app';

interface Options {
  items: Item[];
  topicMetaList: TopicMeta[];
  /** 生成的题目数量与难易分布 */
  stageMap: {
    stage: number;
    count: number;
  }[];
  /** 结果是否要按照 stage 从小到大排序 */
  sort?: boolean;
  /** 赛季 ID */
  seasonID: string;
}

/** 生成一份考卷 */
export const commonPaperGenerator = (options: Options): Topic[] => {
  const { items, topicMetaList, stageMap, sort = true, seasonID } = options;

  // 根据当前的赛季来裁剪 topicMetaList
  let seasonTopicMetaList: typeof topicMetaList = [];
  if (seasonID === 'item1') {
    seasonTopicMetaList = topicMetaList.filter(
      (item) => Number(item.id) <= examSeasonConfig.itemSeasonSplitID,
    );
  }
  if (seasonID === 'item2') {
    seasonTopicMetaList = topicMetaList.filter(
      (item) => Number(item.id) > examSeasonConfig.itemSeasonSplitID,
    );
  }

  const oparateStageMap = _.cloneDeep(stageMap);

  const otpTopics: Topic[] = [];

  for (const topicMeta of _.shuffle(seasonTopicMetaList)) {
    // 如果当前 otpTopics 已经有这个 item 了，则返回 null
    if (otpTopics.some((topic) => topic.itemId === String(topicMeta.id))) {
      continue;
    }
    const item = items.find((item) => item.id === String(topicMeta.id));
    if (!item) continue;
    // 如果 stage1 的题目还没满，生成 stage1 的题目
    if (oparateStageMap[0].count > 0) {
      const topic = generateStage1Topic({
        topicMeta,
        item,
        items,
      });
      if (topic) {
        otpTopics.push(topic);
        oparateStageMap[0].count--;
        continue;
      }
    }
    // 如果 stage2 的题目还没满，生成 stage2 的题目
    if (oparateStageMap[1].count > 0) {
      const topic = generateStage2Topic({
        topicMeta,
        item,
        items,
      });
      if (topic) {
        otpTopics.push(topic);
        oparateStageMap[1].count--;
        continue;
      }
    }
    // 如果 stage3 的题目还没满，生成 stage3 的题目
    if (oparateStageMap[2].count > 0) {
      const topic = generateStage3Topic({
        topicMeta,
        item,
        items,
      });
      if (topic) {
        otpTopics.push(topic);
        oparateStageMap[2].count--;
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
