import { TopicMeta, Topic, TopicStage } from '@typers/exam';
import { Item } from '@typers/handbook';
import { randomAnswer } from '../../randomAnswer';
import _ from 'lodash';

interface Params {
  items: Item[];
  item: Item;
  topicMeta: TopicMeta;
  stage: TopicStage;
}

/** 生成一个任意 stage 的 custom 试题 */
export const generateCustomTopic = (params: Params): Topic | null => {
  const { item, topicMeta, stage } = params;

  if (!topicMeta.questions.find((question) => question.stage === stage)) {
    return null;
  }

  const rawTopic = _.shuffle(
    topicMeta.questions.filter((question) => question.stage === stage),
  )[0];

  // 先取 rawTopic.value 中 [[]] 中的内容
  const correctOption = rawTopic.value.match(/\[\[.*?\]\]/g)?.[0];
  if (!correctOption) {
    console.warn('题目格式错误', rawTopic);
    return null;
  }

  const question = rawTopic.value.replace(/\[\[.*?\]\]/g, '____');
  const cleanCorrectOption = correctOption.replace(/\[\[|\]\]/g, '');
  const options = randomAnswer(cleanCorrectOption, rawTopic.wrongList, 3);

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
};