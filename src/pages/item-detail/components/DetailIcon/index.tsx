import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { ItemIcon } from '@components/ItemIcon';
import { ItemType } from 'src/types/handbook';
import { ChargeBar } from '@components/ChargeBar';

interface Props {
  id: string;
  iconPosition: string;
  type: ItemType;
  charge: string;
}

export const DetailIcon: React.FC<Props> = (props) => {
  return (
    <View className={styles.container}>
      <ItemIcon
        id={props.id}
        location={props.iconPosition}
        size="grid-large"
        type={props.type}
        scaleRate={1.5}
      />
      <View className={styles.charge}>
        <ChargeBar charge={props.charge} scale={2} />
      </View>
    </View>
  );
};
