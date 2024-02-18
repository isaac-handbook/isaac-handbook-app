import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useExamPaper } from '@hooks/useExamPaper';
import { useHandBookData } from '@hooks/useHandbookData';
import { OptionItem } from './OptionItem';
import { CustomButton } from '@components/CustomButton';

interface Props {
  selected: number | null;
  setSelected: (index: number | null) => void;
  relex?: boolean;
}

export const Options: React.FC<Props> = (props) => {
  const { selected, setSelected, relex = false } = props;
  const {
    examPaper: { topicList, currentTopicIndex, userAnswerList },
    submitSingleTopic,
  } = useExamPaper();

  const { getItemDataById } = useHandBookData();

  useEffect(() => {
    // 如果用户当前已经选过这道题，则默认选中
    const curSelect = userAnswerList[currentTopicIndex - 1];
    if (curSelect !== null && curSelect !== undefined) {
      setSelected(curSelect);
    } else {
      setSelected(null);
    }
  }, [currentTopicIndex]);

  if (!topicList.length) return null;

  const curTopic = topicList[currentTopicIndex - 1];

  const item = getItemDataById(
    (curTopic.itemType + 's') as any,
    curTopic.itemId,
  );

  if (!item) {
    console.error('没有定位到 Item', curTopic);
    return '哎呀，出大错了，快去锤开发者';
  }

  const handleNext = () => {
    if (relex) {
      // 娱乐模式下直接检查实发答对了
      submitSingleTopic(selected, 600);
      return;
    }
    submitSingleTopic(selected);
  };

  const handleOptionClick = (index: number) => {
    setSelected(index);
  };

  return (
    <View className={styles.container}>
      {curTopic.options.map((option, index) => {
        return (
          <OptionItem
            selected={selected === index}
            item={item}
            optionValue={option}
            onClick={() => handleOptionClick(index)}
            correctBg={
              relex &&
              currentTopicIndex <= userAnswerList.length &&
              index === curTopic.answer
            }
          />
        );
      })}

      {currentTopicIndex === userAnswerList.length + 1 && (
        <CustomButton
          value={currentTopicIndex === topicList.length ? '交卷' : '下一题'}
          disabled={selected === null}
          onClick={handleNext}
          type="primary"
        />
      )}
    </View>
  );
};
