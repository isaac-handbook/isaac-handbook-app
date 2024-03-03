import React from 'react';
import { View } from '@tarojs/components';
import { IndexTopNav, IndexTopNavProps } from '../IndexTopNav';
import { ItemGrid } from '../ItemGrid';
import styles from './index.module.scss';
import { ItemList } from '@components/itemList';
import { ItemType } from '@typers/handbook';

interface Props extends Omit<IndexTopNavProps, 'type'> {
  showType: 'grid' | 'list';
  type: ItemType;
}

export const ItemSearchView: React.FC<Props> = (props) => {
  const { showType } = props;
  return (
    <View className={styles.container}>
      <IndexTopNav {...props} type={props.type} />
      <View className={styles.itemsView}>
        {showType === 'grid' && <ItemGrid type={props.type} />}
        {showType === 'list' && <ItemList type={props.type} />}
      </View>
    </View>
  );
};
