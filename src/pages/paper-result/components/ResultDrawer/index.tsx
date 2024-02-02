import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Popup } from '@nutui/nutui-react-taro';
import { drawerMaskColor } from '@src/styles';
import { Topic } from '@typers/exam';
import { Item } from '@typers/handbook';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { Question } from '@pages/paper/components/Question';
import { OptionItem } from '@pages/paper/components/Options/OptionItem';

interface Props {
  topic?: Topic;
  item?: Item;
  drawerVisible: boolean;
  userSelect?: number | null;
  closeDrawer: () => void;
}

export const ResultDrawer: React.FC<Props> = (props) => {
  const { topic, item, drawerVisible, userSelect, closeDrawer } = props;

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  return (
    <>
      <Popup
        title={'题目详情'}
        visible={drawerVisible}
        position="bottom"
        round
        onClose={closeDrawer}
        closeable
        overlay={true}
        overlayStyle={{ backgroundColor: drawerMaskColor }}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
        lockScroll
        destroyOnClose
      >
        <View className={styles.drawer}>
          {topic && item && (
            <>
              <Question topic={topic} linkable />
              {userSelect === null && (
                <View className={styles.null}>本题超时未作答</View>
              )}
              {topic.options.map((option, index) => {
                return (
                  <OptionItem
                    selected={index === userSelect}
                    item={item}
                    optionValue={option}
                    onClick={() => {}}
                    correctBg={index === topic.answer}
                  />
                );
              })}
            </>
          )}
        </View>
      </Popup>
    </>
  );
};
