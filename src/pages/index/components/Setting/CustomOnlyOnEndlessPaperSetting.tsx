import React, { memo } from 'react';
import { Switch, View } from '@tarojs/components';
import styles from './index.module.scss';
import { useSetting } from '@hooks/useSetting';

const Cell: React.FC = () => {
  const {
    setting: { customOnlyOnEndlessPaper, developerMode },
    updateSetting,
  } = useSetting();

  const onChange = () => {
    updateSetting({ customOnlyOnEndlessPaper: !customOnlyOnEndlessPaper });
  };

  if (!developerMode) {
    return null;
  }

  return (
    <View className={styles.item}>
      <View className={styles.label}>无尽试卷只生成自定义题目</View>
      <Switch checked={customOnlyOnEndlessPaper} onClick={onChange} />
    </View>
  );
};

export const CustomOnlyOnEndlessPaperSetting = memo(Cell);
