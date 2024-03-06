import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Achieve } from '@typers/handbook';
import { useThemeInfo } from '@hooks/useThemeInfo';

import { AchieveIcon } from '../AchieveIcon';
import { ContentTransformer } from '@components/ContentTransformer';
import { AchieveDetailDrawer } from '../AchieveDetailDrawer';

interface Props {
  achieve: Achieve;
}

export const AchieveItem: React.FC<Props> = (props) => {
  const { achieve } = props;

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  return (
    <AchieveDetailDrawer achieve={achieve}>
      <View
        className={styles.item}
        style={{
          borderColor: themeColor.gridBorderColor + '80',
          color: themeColor.textColor,
          height: '78px',
        }}
      >
        <View className={styles.top}>
          <View className={styles.icon}>
            <AchieveIcon achieve={achieve} />
          </View>
          <View className={styles.topRight}>
            <View className={styles.title}>
              {achieve.id + '. ' + achieve.nameZh}
            </View>
            <View className={styles.subtitle}>
              <ContentTransformer
                value={achieve.unlock}
                mode="clean"
                linkable={false}
              />
            </View>
          </View>
        </View>
      </View>
    </AchieveDetailDrawer>
  );
};
