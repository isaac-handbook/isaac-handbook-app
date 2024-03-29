import React, { memo } from 'react';
import { Switch, View } from '@tarojs/components';
import styles from './index.module.scss';
import { useSetting } from '@hooks/useSetting';

const Cell: React.FC = () => {
  const {
    setting: { performance, developerMode },
    updateSetting,
  } = useSetting();

  const onChange = () => {
    updateSetting({ performance: !performance });
  };

  if (!developerMode) {
    return null;
  }

  return (
    <View className={styles.item}>
      <View className={styles.label}>VirtualList 模式</View>
      <Switch checked={performance} onClick={onChange} />
    </View>
  );
};

export const PerformanceSetting = memo(Cell);
