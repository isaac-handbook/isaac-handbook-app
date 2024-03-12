import React, { memo } from 'react';
import { View } from '@tarojs/components';
import { ItemIcon } from '../ItemIcon';
import { Item, ItemType } from 'src/types/handbook';
import styles from './index.module.scss';
import { GridIconSize, gridSizeMap } from './constants';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { safeNavigate } from '@utils/navigate';

interface Props {
  item: Item;
  size: GridIconSize;
  themeColor: ReturnType<typeof useThemeInfo>['themeInfo']['themeColor'];
  showGridBorder: boolean;
  type: ItemType;
}

const Cell: React.FC<Props> = (props) => {
  const { item, size, themeColor, showGridBorder } = props;
  const handleClick = () => {
    if (!item.id) return;
    safeNavigate({
      url: `/pages/item-detail/index?itemId=${item.id}&type=${props.type}`,
    });
  };

  const columnCount = gridSizeMap[size].columnCount;

  return (
    <View
      className={styles.cell}
      style={{
        height: `${375 / columnCount}px`,
        flex: 1,
        display: item.show ? 'flex' : 'none',
        backgroundColor: themeColor.gridColor,
        borderColor: showGridBorder
          ? themeColor.gridBorderColor
          : 'transparent',
      }}
      onClick={handleClick}
    >
      <ItemIcon
        id={item.id}
        location={item.iconPosition}
        type={props.type}
        size={size}
        scaleRate={showGridBorder ? 1 : 1.1}
      />
    </View>
  );
};

export const ItemGridCell = memo(Cell);
