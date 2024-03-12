import React, { memo } from 'react';
import { View } from '@tarojs/components';
import { ItemIcon } from '../ItemIcon';
import { Item, ItemType } from 'src/types/handbook';
import styles from './index.module.scss';
import { useThemeInfo } from '@hooks/useThemeInfo';
import classNames from 'classnames';
import { safeNavigate } from '@utils/navigate';

interface Props {
  item: Item;
  themeColor: ReturnType<typeof useThemeInfo>['themeInfo']['themeColor'];
  type: ItemType;
  lang?: 'zh' | 'en';
}

const Cell: React.FC<Props> = (props) => {
  const { item, themeColor, lang } = props;
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
      {props.type === 'pill' && (
        <View
          className={classNames(styles.quality, {
            [styles.green]: item.quality === '正面',
            [styles.red]: item.quality === '负面',
          })}
        >
          {item.quality}
        </View>
      )}
      <View className={styles.value}>
        {lang === 'zh' ? item.nameZh : item.nameEn}
      </View>
    </View>
  );
};

export const ItemListCell = memo(Cell);
