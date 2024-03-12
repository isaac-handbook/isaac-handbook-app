import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Seed } from '@typers/handbook';
import { useThemeInfo } from '@hooks/useThemeInfo';

import { SeedDetailDrawer } from '../SeedDetailDrawer';
import { LockAchieveImg } from '@components/LockAchieveImg';

interface Props {
  seed: Seed;
  index: number;
}

export const SeedItem: React.FC<Props> = (props) => {
  const { seed, index } = props;

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  // 给种子的第四位后面加一个空格
  const showSeedCode = seed.seedCode.replace(/(.{4})/g, '$1 ');

  return (
    <SeedDetailDrawer seed={seed}>
      <View
        className={styles.item}
        style={{
          borderColor: themeColor.gridBorderColor + '80',
          color: themeColor.textColor,
        }}
      >
        <View className={styles.title}>
          {index + 1 + '. ' + seed.nameZh}
          {seed.supportAchieve && <LockAchieveImg />}
        </View>
        <View className={styles.subtitle}>{showSeedCode}</View>
      </View>
    </SeedDetailDrawer>
  );
};
