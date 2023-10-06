import React from 'react';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import paperImg from '@assets/paper.png';

interface Props {
  descZh: string;
  nameZh: string;
}

export const Header: React.FC<Props> = (props) => {
  return (
    <View className={styles.container}>
      <Image src={paperImg} className={styles.bg} />
      <View className={styles.line1}>{props.nameZh}</View>
      <View className={styles.line2}>{props.descZh}</View>
    </View>
  );
};
