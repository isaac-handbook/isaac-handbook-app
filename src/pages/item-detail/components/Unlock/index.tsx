import React from 'react';
import { Image, View } from '@tarojs/components';
import styles from './index.module.scss';
import unlockImg from '@assets/unlock.png';
import { ContentTransformer } from '@components/ContentTransformer';
import { ThemeColor } from '@hooks/useThemeInfo/style';

interface Props {
  unlock?: string;
  lockTheme?: ThemeColor;
}

export const Unlock: React.FC<Props> = (props) => {
  if (!props.unlock) {
    return null;
  }

  return (
    <View className={styles.container}>
      <View className={styles.label}>
        <Image className={styles.icon} src={unlockImg} />
        解锁条件
      </View>
      <View className={styles.value}>
        <ContentTransformer value={props.unlock} lockTheme={props.lockTheme} />
      </View>
    </View>
  );
};
