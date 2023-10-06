import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { ENTITY_ENEMY_IMG_URL, ENTITY_BOSS_IMG_URL } from '@constants';
import { ThemeColor } from '@hooks/useThemeInfo/style';

interface Props {
  location: string;
  scale?: number;
  top?: number;
  marginLeft?: number;
  marginRight?: number;
  themeType: ThemeColor['type'];
  entityType: 'enemy' | 'boss';
}

export const EntityIcon: React.FC<Props> = (props) => {
  const {
    location,
    scale = 1,
    top = 0,
    marginLeft = 0,
    marginRight = 0,
    themeType,
    entityType,
  } = props;

  if (!location) {
    return null;
  }

  let imgUrl = '';
  if (entityType === 'enemy') {
    imgUrl = ENTITY_ENEMY_IMG_URL;
  }
  if (entityType === 'boss') {
    imgUrl = ENTITY_BOSS_IMG_URL;
  }

  if (!imgUrl) {
    return null;
  }

  return (
    <View
      style={{
        backgroundPosition: location,
        backgroundImage: `url(${imgUrl})`,
        transform: `scale(${scale})`,
        top: `${top}rpx`,
        marginLeft: `${marginLeft}rpx`,
        marginRight: `${marginRight}rpx`,
        filter:
          themeType === 'dark' ? 'invert(100%) hue-rotate(180deg)' : undefined,
      }}
      className={styles.icon}
    ></View>
  );
};
