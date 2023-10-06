import React, { memo } from 'react';
import { Picker, View } from '@tarojs/components';
import styles from './index.module.scss';
import { themeList, useSetting } from '@hooks/useSetting';

const Cell: React.FC = () => {
  const {
    setting: { theme },
    updateSetting,
  } = useSetting();

  const onChange = (e: any) => {
    updateSetting({ theme: selectList[e.detail.value].value });
  };

  const selectList = [...themeList];

  return (
    <>
      <Picker
        mode="selector"
        range={selectList}
        onChange={onChange}
        rangeKey="label"
        value={selectList.findIndex((item) => item.value === theme)}
      >
        <View className={styles.item}>
          <View className={styles.label}>主题色</View>
          <View className={styles.value}>
            {selectList.find((item) => item.value === theme)?.label}
          </View>
        </View>
      </Picker>
    </>
  );
};

export const ThemeSetting = memo(Cell);
