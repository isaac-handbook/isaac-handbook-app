import { TopicMeta, Topic, TopicStage } from '@typers/exam';
import { Item } from '@typers/handbook';
import { randomAnswer } from '../../randomAnswer';
import _ from 'lodash';

interface Params {
  items: Item[];
  item: Item;
  topicMeta: TopicMeta;
  stage: TopicStage;
  optionCount?: number;
  /** 生成所有的 */
  all?: boolean;
}

/** 生成一个任意 stage 的 custom 试题 */
export const generateCustomTopic = (params: Params): Topic[] => {
  const { item, topicMeta, stage, optionCount = 3, all = false } = params;

  if (!topicMeta.questions?.find((question) => question.stage === stage)) {
    return [];
  }

  if (all) {
    return topicMeta.questions
      .filter((question) => question.stage === stage)
      .map((rawTopic) => {
        const correctOption = rawTopic.value.match(/\[\[.*?\]\]/g)?.[0];
        if (!correctOption) {
          console.warn('题目格式错误', rawTopic);
          return null;
        }

        const question = rawTopic.value.replace(/\[\[.*?\]\]/g, '_____');
        const cleanCorrectOption = correctOption.replace(/\[\[|\]\]/g, '');
        const options = randomAnswer(
          cleanCorrectOption,
          rawTopic.wrongList,
          optionCount,
        );

        const topic: Topic = {
          itemId: item.id,
          itemType: item.type,
          type: 'custom',
          question,
          options: options.options,
          answer: options.answer,
          stage,
        };

        return topic;
      })
      .filter((topic): topic is Topic => !!topic);
  }

  const rawTopic = _.shuffle(
    topicMeta.questions.filter((question) => question.stage === stage),
  )[0];

  // 先取 rawTopic.value 中 [[]] 中的内容
  const correctOption = rawTopic.value.match(/\[\[.*?\]\]/g)?.[0];
  if (!correctOption) {
    console.warn('题目格式错误', rawTopic);
    return [];
  }

  const question = rawTopic.value.replace(/\[\[.*?\]\]/g, '_____');
  const cleanCorrectOption = correctOption.replace(/\[\[|\]\]/g, '');
  const options = randomAnswer(
    cleanCorrectOption,
    rawTopic.wrongList,
    optionCount,
  );

  const topic: Topic = {
    itemId: item.id,
    itemType: item.type,
    type: 'custom',
    question,
    options: options.options,
    answer: options.answer,
    stage,
  };

  return [topic];
};
