import React, { memo } from 'react';
import { Picker, View } from '@tarojs/components';
import styles from './index.module.scss';
import { chargeTypeList, useItemSearchInfo } from '@hooks/useItemSearchInfo';

const Cell: React.FC = () => {
  const {
    itemSearchInfo: { chargeFilter },
    setItemSearchInfo,
  } = useItemSearchInfo();

  const onChange = (e: any) => {
    const cur: any = selectList[e.detail.value];
    setItemSearchInfo((prev) => ({
      ...prev,
      chargeFilter: cur,
    }));
  };

  const selectList: string[] = [...chargeTypeList].filter((item) => item);

  selectList.unshift('全部');

  return (
    <>
      <Picker
        mode="selector"
        range={selectList}
        onChange={onChange}
        value={selectList.indexOf(chargeFilter || '全部')}
      >
        <View className={styles.item}>
          <View className={styles.label}>充能类型</View>
          <View className={styles.value}>{chargeFilter || '全部'}</View>
        </View>
      </Picker>
    </>
  );
};

export const ChargeFilter = memo(Cell);
