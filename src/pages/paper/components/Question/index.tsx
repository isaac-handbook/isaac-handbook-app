import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useExamPaper } from '@hooks/useExamPaper';
import { ItemIcon } from '@components/ItemIcon';
import { useHandBookData } from '@hooks/useHandbookData';
import { ContentTransformer } from '@components/ContentTransformer';

interface Props {
  curIndex: number;
}

export const Question: React.FC<Props> = (props) => {
  const { curIndex } = props;
  const {
    examPaper: { topicList },
  } = useExamPaper();
  const { getItemDataById } = useHandBookData();

  if (!topicList.length) return null;

  const curTopic = topicList[curIndex - 1];

  const item = getItemDataById(
    (curTopic.itemType + 's') as any,
    curTopic.itemId,
  );

  if (!item) {
    console.error('没有定位到 Item', curTopic);
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
          value={curTopic.question}
          id={item.id}
          nameZh={item.nameZh}
          linkable={false}
        />
      </View>
    </View>
  );
};
