import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useExamPaper } from '@hooks/useExamPaper';
import { useHandBookData } from '@hooks/useHandbookData';
import { ContentTransformer } from '@components/ContentTransformer';
import { Button } from '@nutui/nutui-react-taro';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { Checklist } from '@nutui/icons-react-taro';
import classNames from 'classnames';

interface Props {
  curIndex: number;
}

export const Options: React.FC<Props> = (props) => {
  const { curIndex } = props;
  const {
    examPaper: { topicList },
    submitSingleTopic,
  } = useExamPaper();

  const { getItemDataById } = useHandBookData();

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  // 当前选中的
  const [selected, setSelected] = React.useState<number | null>(null);

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
    submitSingleTopic(2);
  };

  const handleOptionClick = (index: number) => {
    setSelected(index);
  };

  return (
    <View className={styles.container}>
      {curTopic.options.map((option, index) => {
        let boxShadow = '';
        if (selected === index) {
          boxShadow =
            themeColor.type === 'dark'
              ? '0 0 8px rgba(255, 255, 255, 0.3)'
              : '0 0 8px rgba(0, 0, 0, 0.2)';
        }
        return (
          <View
            key={`key${index}`}
            className={classNames(styles.option, {
              [styles.selected]: selected === index,
            })}
            onClick={() => handleOptionClick(index)}
            style={{
              background: themeColor.gridColor,
              color: themeColor.textColor,
              boxShadow,
            }}
          >
            <View
              className={styles.check}
              style={{ borderColor: themeColor.textColor }}
            >
              {selected === index && (
                <View className={styles.checkIcon}>
                  <Checklist size={14} color={themeColor.textColor} />
                </View>
              )}
            </View>
            <View className={styles.value}>
              <ContentTransformer
                id={item.id}
                nameZh={item.nameZh}
                value={String(option)}
                linkable={false}
                lineHeight="60rpx"
              />
            </View>
          </View>
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
