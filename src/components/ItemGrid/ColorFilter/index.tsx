import React, { memo } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { ItemType } from 'src/types/handbook';
import { ColorType, useItemSearchInfo } from '@hooks/useItemSearchInfo';
import { useTrinketSearchInfo } from '@hooks/useTrinketSearchInfo';
import classNames from 'classnames';
import { Checklist } from '@nutui/icons-react-taro';
import { useThemeInfo } from '@hooks/useThemeInfo';

interface Props {
  type: ItemType;
  height?: string;
}

const colorList: { colorHex: string; colorType: ColorType }[] = [
  { colorHex: '#ffffff', colorType: 'whi' },
  { colorHex: '#222222', colorType: 'bla' },
  { colorHex: '#f5222d', colorType: 'red' },
  { colorHex: '#d46b08', colorType: 'bro' },
  { colorHex: '#DEACAC', colorType: 'rou' },
  { colorHex: '#fadb14', colorType: 'yel' },
  { colorHex: '#52c41a', colorType: 'gre' },
  { colorHex: '#1677ff', colorType: 'blu' },
  { colorHex: '#722ed1', colorType: 'pur' },
];

const Cell: React.FC<Props> = (props) => {
  const { type, height = '208rpx' } = props;

  const {
    itemSearchInfo: { filteredColors: item_filteredColors },
    updateItemSearchInfo,
  } = useItemSearchInfo();

  const {
    trinketSearchInfo: { filteredColors: trinket_filteredColors },
    updateTrinketSearchInfo,
  } = useTrinketSearchInfo();

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const curSelected =
    type === 'item' ? item_filteredColors : trinket_filteredColors;

  const handleClick = (colorType: ColorType) => {
    if (type === 'item') {
      if (curSelected.includes(colorType)) {
        updateItemSearchInfo({
          filteredColors: curSelected.filter((color) => color !== colorType),
        });
      } else {
        updateItemSearchInfo({
          filteredColors: [...curSelected, colorType],
        });
      }
    }
    if (type === 'trinket') {
      if (curSelected.includes(colorType)) {
        updateTrinketSearchInfo({
          filteredColors: curSelected.filter((color) => color !== colorType),
        });
      } else {
        updateTrinketSearchInfo({
          filteredColors: [...curSelected, colorType],
        });
      }
    }
  };

  return (
    <View className={styles.wrapper} style={{ height }}>
      <View
        className={styles.container}
        style={{ height: '104rpx', borderColor: themeColor.gridBorderColor }}
      >
        {colorList.map((color) => (
          <View
            className={styles.itemWrapper}
            onClick={() => handleClick(color.colorType)}
          >
            <View
              className={classNames(styles.item, {
                [styles.selected]: curSelected.includes(color.colorType),
              })}
              style={{ background: color.colorHex }}
            >
              {curSelected.includes(color.colorType) && (
                <Checklist
                  size={'20px'}
                  color={color.colorType === 'whi' ? '#000000' : '#ffffff'}
                />
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export const ColorFilter = memo(Cell);
