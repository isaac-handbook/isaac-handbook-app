import React from 'react';
import { Image, View } from '@tarojs/components';
import styles from './index.module.scss';
import unlockImg from '@assets/unlock.png';
import { ContentTransformer } from '@components/ContentTransformer';

interface Props {
  unlock: string;
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
        <ContentTransformer value={props.unlock} />
      </View>
    </View>
  );
};
