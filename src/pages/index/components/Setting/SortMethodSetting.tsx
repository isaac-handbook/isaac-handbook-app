import React, { memo } from 'react';
import { Picker, View } from '@tarojs/components';
import styles from './index.module.scss';
import { sortMethodList, useSetting } from '@hooks/useSetting';

const Cell: React.FC = () => {
  const {
    setting: { sortMethod },
    updateSetting,
  } = useSetting();

  const onChange = (e: any) => {
    updateSetting({ sortMethod: selectList[e.detail.value] });
  };

  const selectList = [...sortMethodList];

  return (
    <>
      <Picker
        mode="selector"
        range={selectList}
        onChange={onChange}
        value={selectList.indexOf(sortMethod)}
      >
        <View className={styles.item}>
          <View className={styles.label}>排序方式</View>
          <View className={styles.value}>{sortMethod}</View>
        </View>
      </Picker>
    </>
  );
};

export const SortMethodSetting = memo(Cell);
