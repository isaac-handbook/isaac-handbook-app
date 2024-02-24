import { TopicMeta, Topic, ExamRawData } from '../../../../types/exam';
import { Item } from '../../../../types/handbook';
import * as _ from 'lodash';
import { generateAllStage1Topic } from '../topic/generateStage1Topic';
import { generateAllStage2Topic } from '../topic/generateStage2Topic';
import { generateAllStage3Topic } from '../topic/generateStage3Topic';
import { examSeasonConfig } from '@src/config/config.app';
import { generateItemTopicMetaList } from './generateMetaList';

interface Options {
  items: Item[];
  examRawData: ExamRawData;
  /** 生成的题目包含的难度 */
  stageList: number[];
  /** 赛季 ID */
  seasonID: string;
  /** 只生成自定义试题 */
  customOnly?: boolean;
}

/**
 * 生成一份无尽模式的试卷
 * 生成 topicMetaList 中每个 item 每个 stage 的所有 type 的题目
 */
export const endlessPaperGenerator = (options: Options): Topic[] => {
  const {
    items,
    examRawData,
    stageList = [1, 2, 3],
    seasonID,
    customOnly = false,
  } = options;

  let topicMetaList: TopicMeta[] = [];
  if (seasonID.includes('item')) {
    topicMetaList = generateItemTopicMetaList(items, examRawData.item);
  }

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

  const otpTopics: Topic[] = [];

  for (const topicMeta of seasonTopicMetaList) {
    const item = items.find((item) => item.id === String(topicMeta.id));
    if (!item) continue;
    // 生成 stage1 的题目
    if (stageList.includes(1)) {
      const topics = generateAllStage1Topic({
        topicMeta,
        item,
        items,
        customOnly,
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
        customOnly,
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
        customOnly,
      });
      if (topics.length) {
        otpTopics.push(...topics);
      }
    }
  }

  // 打乱一下
  return _.shuffle(otpTopics);
};
