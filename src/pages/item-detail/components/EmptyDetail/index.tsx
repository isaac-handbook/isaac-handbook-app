import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { ItemType } from 'src/types/handbook';

interface Props {
  id: string;
  type: ItemType;
}

export const EmptyDetail: React.FC<Props> = (props) => {
  return (
    <View className={styles.container}>
      <View>
        正在加载：{props.type}
        {` `}
        {`ID=${props.id}`}
      </View>
    </View>
  );
};
