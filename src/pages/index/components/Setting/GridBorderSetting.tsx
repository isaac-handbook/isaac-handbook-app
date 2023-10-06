import React, { memo } from 'react';
import { Switch, View } from '@tarojs/components';
import styles from './index.module.scss';
import { useSetting } from '@hooks/useSetting';

const Cell: React.FC = () => {
  const {
    setting: { showGridBorder },
    updateSetting,
  } = useSetting();

  const onChange = () => {
    updateSetting({ showGridBorder: !showGridBorder });
  };

  return (
    <View className={styles.item}>
      <View className={styles.label}>是否展示分割线</View>
      <Switch checked={showGridBorder} onClick={onChange} />
    </View>
  );
};

export const GridBorderSetting = memo(Cell);
