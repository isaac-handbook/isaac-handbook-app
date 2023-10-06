import React, { memo } from 'react';
import { View } from '@tarojs/components';
import { ItemIcon } from '../ItemIcon';
import { Item, ItemType } from 'src/types/handbook';
import styles from './index.module.scss';
import Taro from '@tarojs/taro';
import { useThemeInfo } from '@hooks/useThemeInfo';

interface Props {
  item: Item;
  themeColor: ReturnType<typeof useThemeInfo>['themeInfo']['themeColor'];
  type: ItemType;
}

const Cell: React.FC<Props> = (props) => {
  const { item, themeColor } = props;
  const handleClick = () => {
    Taro.navigateTo({
      url: `/pages/item-detail/index?itemId=${item.id}&type=${props.type}`,
    });
  };

  return (
    <View
      className={styles.cell}
      style={{
        backgroundColor: themeColor.gridColor,
        borderColor: themeColor.gridBorderColor,
        color: themeColor.textColor,
      }}
      onClick={handleClick}
    >
      <View className={styles.icon}>
        <ItemIcon
          id={item.id}
          location={item.iconPosition}
          size="grid-small"
          type={props.type}
          scaleRate={1}
        />
      </View>
      <View className={styles.value}>{item.nameZh}</View>
    </View>
  );
};

export const ItemListCell = memo(Cell);
