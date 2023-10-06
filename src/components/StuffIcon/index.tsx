import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { STUFF_ICON_IMG_URL } from '@constants';

interface Props {
  location: string;
  scale?: number;
  top?: number;
  marginLeft?: number;
  marginRight?: number;
}

export const StuffIcon: React.FC<Props> = (props) => {
  const {
    location,
    scale = 1,
    top = 0,
    marginLeft = 0,
    marginRight = 0,
  } = props;

  if (!location) {
    return null;
  }

  return (
    <View
      style={{
        backgroundPosition: location,
        backgroundImage: `url(${STUFF_ICON_IMG_URL})`,
        transform: `scale(${scale})`,
        top: `${top}rpx`,
        marginLeft: `${marginLeft}rpx`,
        marginRight: `${marginRight}rpx`,
      }}
      className={styles.icon}
    ></View>
  );
};
