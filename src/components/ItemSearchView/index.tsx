import React from 'react';
import { View } from '@tarojs/components';
import { IndexTopNav, IndexTopNavProps } from '../IndexTopNav';
import { ItemGrid } from '../ItemGrid';
import styles from './index.module.scss';
import { ItemList } from '@components/itemList';

interface Props extends IndexTopNavProps {
  showType: 'grid' | 'list';
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
