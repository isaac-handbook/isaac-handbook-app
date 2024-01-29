import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useExamPaper } from '@hooks/useExamPaper';
import { ItemIcon } from '@components/ItemIcon';
import { useHandBookData } from '@hooks/useHandbookData';
import { ContentTransformer } from '@components/ContentTransformer';
import { Topic } from '@typers/exam';
import Taro from '@tarojs/taro';

interface Props {
  topic: Topic;
  // 是否可以点击跳转到 Item 详情页
  linkable?: boolean;
}

export const Question: React.FC<Props> = (props) => {
  const { topic, linkable } = props;
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

  const handleIconClick = () => {
    if (!linkable) {
      return;
    }
    Taro.navigateTo({
      url: `/pages/item-detail/index?type=${item.type}&itemId=${item.id}`,
    });
  };

  return (
    <View className={styles.container}>
      <View className={styles.icon} onClick={handleIconClick}>
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
