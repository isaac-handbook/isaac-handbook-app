import { TopicMeta } from '@typers/exam';
import { Item } from '@typers/handbook';

export const generateItemTopicMetaList = (
  items: Item[],
  rawTopicMetaList: TopicMeta[],
) => {
  return items
    .filter((item) => item.description)
    .map((item) => {
      const topicMeta = rawTopicMetaList.find(
        (topicMeta) => Number(topicMeta.id) === Number(item.id),
      );
      if (!topicMeta) {
        return {
          id: item.id,
          type: item.type,
          questions: [],
        };
      }
      return topicMeta;
    });
};
