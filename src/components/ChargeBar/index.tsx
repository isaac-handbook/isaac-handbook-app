import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { CHARGE_BAR_IMG_URL } from '@constants';

interface Props {
  charge: string;
  showText?: boolean;
  scale: number;
}

export const chargeLevelBgMap = {
  '1': '16px 32px',
  '2': '32px 32px',
  '3': '48px 32px',
  '4': '0px 32px',
  '6': '16px 0px',
  '12': '32px 0px',
};

export const ChargeBar: React.FC<Props> = (props) => {
  const { charge, scale, showText = true } = props;

  if (!charge || charge === '/') {
    return null;
  }

  const yellow = charge.includes('一次性');

  const half = charge.includes('秒') || charge === '0';

  let bgPosition = chargeLevelBgMap[charge.replace(',一次性使用', '')];
  if ((yellow || half) && !bgPosition) {
    bgPosition = chargeLevelBgMap['1'];
  }

  return (
    <View
      className={styles.container}
      style={{
        backgroundImage: `url(${CHARGE_BAR_IMG_URL})`,
        transform: `scale(${scale})`,
      }}
    >
      <View
        className={styles.bar}
        style={{
          backgroundImage: `url(${CHARGE_BAR_IMG_URL})`,
          backgroundPosition: half ? '48px -14px' : '48px -2px',
          height: half ? '18px' : '30px',
          top: half ? '14px' : '2px',
        }}
      ></View>
      {yellow && (
        <View
          className={styles.bar}
          style={{
            backgroundImage: `linear-gradient(#FF0000,#FF0000),url(${CHARGE_BAR_IMG_URL})`,
            backgroundPosition: '43px -2px',
            height: '24px',
            top: '2px',
            width: '4px',
            left: '5px',
          }}
        ></View>
      )}
      <View
        className={styles.bar}
        style={{
          backgroundImage: `url(${CHARGE_BAR_IMG_URL})`,
          backgroundPosition: bgPosition,
        }}
      ></View>

      {showText && (
        <View className={styles.text}>
          <View>{charge.split(',')[0]}</View>
          {charge.includes(',') && (
            <View style={{ fontSize: '12rpx' }}>{charge.split(',')[1]}</View>
          )}
        </View>
      )}
    </View>
  );
};
