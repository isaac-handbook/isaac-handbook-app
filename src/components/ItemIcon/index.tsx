import React from 'react';
import { Image, View } from '@tarojs/components';
import styles from './index.module.scss';
import {
  CARD_ICON_IMG_URL,
  ITEM_ICON_IMG_URL,
  RUNE_ICON_IMG_URL,
  TRINKET_ICON_IMG_URL,
  specialRuneIdList,
} from '@constants';
import { GridIconSize, gridSizeMap } from '../ItemGrid/constants';
import pillImg from '@assets/胶囊.png';
import { ItemType } from 'src/types/handbook';

interface Props {
  id: string;
  location: string;
  size: 'inline' | GridIconSize;
  type: ItemType;
  opacity?: number;
  // scale放大倍率
  scaleRate?: number;
  absolute?: boolean;
}

export const ItemIcon: React.FC<Props> = (props) => {
  const {
    location,
    size,
    type,
    opacity = 1,
    scaleRate = 1,
    absolute = false,
  } = props;

  if (!location && type !== 'pill') {
    return null;
  }

  // 图标大小
  let scale = 1;
  if (size === 'inline') {
    scale = 1;
  } else {
    scale = gridSizeMap[size].scale;
  }
  scale *= scaleRate;

  // 图标类型-图片地址
  let url = '';
  switch (type) {
    case 'item':
      url = ITEM_ICON_IMG_URL;
      break;
    case 'trinket':
      url = TRINKET_ICON_IMG_URL;
      break;
    case 'card':
      if (specialRuneIdList.includes(props.id)) {
        url = RUNE_ICON_IMG_URL;
      } else {
        url = CARD_ICON_IMG_URL;
      }
      break;
    default:
      break;
  }

  if (type === 'pill') {
    return (
      <Image
        src={pillImg}
        className={styles.img}
        style={{
          transform: `scale(${scale})`,
          position: absolute ? 'absolute' : 'relative',
          top: absolute ? '2rpx' : '4rpx',
        }}
      />
    );
  }

  const isSpecialRune = type === 'card' && specialRuneIdList.includes(props.id);

  return (
    <View
      style={{
        backgroundPosition: location,
        transform: `scale(${scale})`,
        backgroundImage: `url(${url})`,
        opacity,
        position: absolute ? 'absolute' : 'relative',
        backgroundSize: isSpecialRune ? '288px,32px' : undefined,
      }}
      className={styles.icon}
    ></View>
  );
};
