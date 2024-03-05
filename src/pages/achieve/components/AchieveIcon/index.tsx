import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Achieve } from '@typers/handbook';
import { ACHIEVE_ICON_IMG_URL } from '@constants';
import { AchieveDetailDrawer } from '../AchieveDetailDrawer';

interface Props {
  achieve: Achieve;
  scaleRate?: number;
  clickable?: boolean;
}

export const AchieveIcon: React.FC<Props> = (props) => {
  const { achieve, scaleRate = 0.88, clickable = false } = props;

  const renderIcon = () => {
    return (
      <View
        className={styles.icon}
        style={{
          backgroundPosition: achieve.iconPosition,
          backgroundImage: `url(${ACHIEVE_ICON_IMG_URL})`,
          transform: `scale(${scaleRate})`,
        }}
      ></View>
    );
  };

  if (clickable) {
    return (
      <AchieveDetailDrawer achieve={achieve}>
        {renderIcon()}
      </AchieveDetailDrawer>
    );
  }

  return renderIcon();
};
