import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useExamPaper } from '@hooks/useExamPaper';
import { ItemIcon } from '@components/ItemIcon';
import { useHandBookData } from '@hooks/useHandbookData';
import { ContentTransformer } from '@components/ContentTransformer';
import { Topic } from '@typers/exam';
import Taro from '@tarojs/taro';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { ArrowLeft, ArrowRight } from '@nutui/icons-react-taro';

interface Props {
  topic: Topic;
  // 是否可以点击跳转到 Item 详情页
  linkable?: boolean;
  relex?: boolean;
}

export const Question: React.FC<Props> = (props) => {
  const { topic, linkable, relex = false } = props;
  const {
    examPaper: { topicList, userAnswerList, currentTopicIndex },
    updateSingleExamPaperState,
  } = useExamPaper();
  const { getItemDataById } = useHandBookData();

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

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

  // 如果是娱乐模式，且不是第一题，那么可以点击上一题
  const getPrevItem = () => {
    if (!relex || !currentTopicIndex || currentTopicIndex === 1) {
      return false;
    }
    return true;
  };

  // 如果是娱乐模式，且不是当前正在做的题，那么可以点击下一题
  const getNextItem = () => {
    if (
      !relex ||
      !currentTopicIndex ||
      currentTopicIndex === userAnswerList.length + 1
    ) {
      return false;
    }
    return true;
  };

  const goToPrevItem = () => {
    updateSingleExamPaperState('currentTopicIndex', currentTopicIndex - 1);
  };

  const goToNextItem = () => {
    updateSingleExamPaperState('currentTopicIndex', currentTopicIndex + 1);
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

      {getPrevItem() && (
        <View onClick={goToPrevItem} className={styles.turnPrev}>
          <ArrowLeft size={24} color={themeColor.textColor} />
        </View>
      )}
      {getNextItem() && (
        <View onClick={goToNextItem} className={styles.turnNext}>
          <ArrowRight size={24} color={themeColor.textColor} />
        </View>
      )}
    </View>
  );
};
