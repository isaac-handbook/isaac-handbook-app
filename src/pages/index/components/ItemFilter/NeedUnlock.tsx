import React, { memo } from 'react';
import { Picker, View } from '@tarojs/components';
import styles from './index.module.scss';
import { unlockTypeList, useItemSearchInfo } from '@hooks/useItemSearchInfo';

const Cell: React.FC = () => {
  const {
    itemSearchInfo: { unlockFilter },
    setItemSearchInfo,
  } = useItemSearchInfo();

  const onChange = (e: any) => {
    const cur: any = selectList[e.detail.value];
    setItemSearchInfo((prev) => ({
      ...prev,
      unlockFilter: cur,
    }));
  };

  const selectList: string[] = [...unlockTypeList].filter((item) => item);

  selectList.unshift('全部');

  return (
    <>
      <Picker
        mode="selector"
        range={selectList}
        onChange={onChange}
        value={selectList.indexOf(unlockFilter || '全部')}
      >
        <View className={styles.item}>
          <View className={styles.label}>是否需要解锁</View>
          <View className={styles.value}>{unlockFilter || '全部'}</View>
        </View>
      </Picker>
    </>
  );
};

export const NeedUnlock = memo(Cell);
