import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Achieve } from '@typers/handbook';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { ContentTransformer } from '@components/ContentTransformer';

interface Props {
  achieve: Achieve;
}

export const AchieveItem: React.FC<Props> = (props) => {
  const { achieve } = props;

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  return (
    <View
      className={styles.item}
      style={{
        borderColor: themeColor.gridBorderColor + '80',
        color: themeColor.textColor,
        height: '84px',
      }}
    >
      <View className={styles.id}>{achieve.id}</View>
      <View className={styles.unlock}>
        <ContentTransformer value={achieve.unlock} />
      </View>
      <View className={styles.unlockItem}>
        <ContentTransformer value={achieve.unlockItem} />
      </View>
    </View>
  );
};
