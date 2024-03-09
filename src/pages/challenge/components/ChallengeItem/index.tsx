import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Challenge } from '@typers/handbook';
import { useThemeInfo } from '@hooks/useThemeInfo';

import { ChallengeDetailDrawer } from '../ChallengeDetailDrawer';

interface Props {
  challenge: Challenge;
}

export const ChallegeItem: React.FC<Props> = (props) => {
  const { challenge } = props;

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  return (
    <ChallengeDetailDrawer challenge={challenge}>
      <View
        className={styles.item}
        style={{
          borderColor: themeColor.gridBorderColor + '80',
          color: themeColor.textColor,
        }}
      >
        <View className={styles.title}>
          {challenge.id + '. ' + challenge.nameZh}
        </View>
        <View className={styles.subtitle}>{challenge.nameEn}</View>
      </View>
    </ChallengeDetailDrawer>
  );
};
