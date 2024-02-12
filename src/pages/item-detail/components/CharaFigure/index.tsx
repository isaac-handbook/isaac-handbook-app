import React from 'react';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';

interface Props {
  itemId: string;
}

export const CharaFigure: React.FC<Props> = (props) => {
  const { itemId } = props;

  try {
    const figureUrl = require(`@assets/figure/tiny/${itemId}.png`);
    if (!figureUrl) {
      return null;
    }
    return (
      <View className={styles.container}>
        <Image mode="aspectFit" src={figureUrl} className={styles.figureImg} />
      </View>
    );
  } catch (error) {
    return null;
  }
};
