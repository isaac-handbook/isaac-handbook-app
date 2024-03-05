import React from 'react';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import paperImg from '@assets/paper.png';

interface Props {
  descZh: string;
  nameZh: string;
  height?: string;
}

export const Header: React.FC<Props> = (props) => {
  const { height = '176rpx' } = props;
  return (
    <View className={styles.container} style={{ height }}>
      <Image src={paperImg} className={styles.bg} style={{ height }} />
      <View className={styles.line1}>{props.nameZh}</View>
      <View className={styles.line2}>{props.descZh}</View>
    </View>
  );
};
