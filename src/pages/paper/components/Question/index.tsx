import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useExamPaper } from '@hooks/useExamPaper';
import { ItemIcon } from '@components/ItemIcon';
import { useHandBookData } from '@hooks/useHandbookData';
import { ContentTransformer } from '@components/ContentTransformer';
import { Topic } from '@typers/exam';

interface Props {
  topic: Topic;
}

export const Question: React.FC<Props> = (props) => {
  const { topic } = props;
  const {
    examPaper: { topicList },
  } = useExamPaper();
  const { getItemDataById } = useHandBookData();

  if (!topicList.length) return null;

  const item = getItemDataById((topic.itemType + 's') as any, topic.itemId);

  if (!item) {
    console.error('没有定位到 Item', topic);
    return '哎呀，出大错了，快去锤开发者';
  }

  return (
    <View className={styles.container}>
      <View className={styles.icon}>
        <ItemIcon
          type={item.type}
          id={item.id}
          location={item.iconPosition}
          size="grid-large"
          scaleRate={1.5}
        />
      </View>
      <View className={styles.question}>
        <ContentTransformer
          value={topic.question}
          id={item.id}
          nameZh={item.nameZh}
          linkable={false}
        />
      </View>
    </View>
  );
};
