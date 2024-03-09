import React from 'react';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import paperImg from '@assets/paper.png';
import classNames from 'classnames';

interface Props {
  descZh?: string;
  nameZh?: string;
  type?: 'default' | 'oneRow';
}

export const PaperHeader: React.FC<Props> = (props) => {
  const { type = 'default' } = props;
  const isOneRow = type === 'oneRow';
  return (
    <View className={classNames(styles.container, isOneRow && styles.oneRow)}>
      <Image
        src={paperImg}
        className={classNames(styles.bg, isOneRow && styles.oneRow)}
      />
      <View className={classNames(styles.line1, isOneRow && styles.oneRow)}>
        {isOneRow ? props.descZh : props.nameZh}
      </View>
      {!isOneRow && <View className={styles.line2}>{props.descZh}</View>}
    </View>
  );
};
