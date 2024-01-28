import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useExamPaper } from '@hooks/useExamPaper';
import { useHandBookData } from '@hooks/useHandbookData';
import { Button } from '@nutui/nutui-react-taro';
import { OptionItem } from './OptionItem';

interface Props {
  curIndex: number;
  selected: number | null;
  setSelected: (index: number | null) => void;
}

export const Options: React.FC<Props> = (props) => {
  const { curIndex, selected, setSelected } = props;
  const {
    examPaper: { topicList },
    submitSingleTopic,
  } = useExamPaper();

  const { getItemDataById } = useHandBookData();

  useEffect(() => {
    setSelected(null);
  }, [curIndex]);

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

  const handleNext = () => {
    // 如果已经是最后一题了，那么就不再跳转了
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
          />
        );
      })}
      <Button
        className={styles.btn}
        disabled={selected === null}
        onClick={handleNext}
        style={
          {
            '--nutui-button-border-width': '0px',
            '--nutui-button-default-height': '48px',
            '--nutui-button-default-font-size': '16px',
            '--nutui-button-default-background-color': '#ffffff',
          } as any
        }
      >
        {curIndex === topicList.length ? '交卷' : '下一题'}
      </Button>
    </View>
  );
};
