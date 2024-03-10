import { Image } from '@tarojs/components';
import React from 'react';

import lockAchieveImg from '@assets/lockAchieve.png';
import styles from './index.module.scss';

export const LockAchieveImg: React.FC = () => {
  return <Image src={lockAchieveImg} className={styles.img} />;
};
