import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import Taro from '@tarojs/taro';

interface Props {
  value: string;
  action: 'copy' | 'default';
  copyValue?: string;
  onClick?: () => void;
}

export const LinkText: React.FC<Props> = (props) => {
  const { value, action, copyValue, onClick } = props;

  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick();
      return;
    }
    if (action === 'copy' && copyValue) {
      copyUrl(copyValue);
    }
  };

  return (
    <View className={styles.inline} onClick={handleClick}>
      {value}
    </View>
  );
};

const copyUrl = (url: string) => {
  Taro.setClipboardData({
    data: url,
    success: () => {
      Taro.showToast({
        title: '复制成功',
        icon: 'success',
        duration: 1000,
      });
    },
  });
};
