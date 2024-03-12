import React, { memo } from 'react';
import { View } from '@tarojs/components';
import { ItemIcon } from '../ItemIcon';
import { Item, ItemType } from 'src/types/handbook';
import styles from './index.module.scss';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { ContentTransformer } from '@components/ContentTransformer';
import { safeNavigate } from '@utils/navigate';

interface Props {
  item: Item;
  themeColor: ReturnType<typeof useThemeInfo>['themeInfo']['themeColor'];
  type: ItemType;
  nameZh: string;
}

const Cell: React.FC<Props> = (props) => {
  const { item, themeColor, nameZh } = props;
  const handleClick = () => {
    safeNavigate({
      url: `/pages/item-detail/index?itemId=${item.id}&type=${props.type}`,
    });
  };

  return (
    <View
      className={styles.cell}
      style={{
        backgroundColor: themeColor.gridColor,
        borderColor: themeColor.gridBorderColor + '80',
        color: themeColor.textColor,
      }}
      onClick={handleClick}
    >
      <View className={styles.icon}>
        <ItemIcon
          id={item.id}
          location={item.iconPosition}
          size="grid-tiny"
          type={props.type}
          scaleRate={1}
        />
      </View>
      <View className={styles.value}>
        <ContentTransformer
          value={item.unlock?.replace(`用{{chara|${nameZh}}}`, '')}
          mode="clean"
          lineHeight="48rpx"
        />
      </View>
    </View>
  );
};

export const UnlockItemCell = memo(Cell);
