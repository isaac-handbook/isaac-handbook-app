import React, { memo } from 'react';
import { Picker, View } from '@tarojs/components';
import styles from './index.module.scss';
import { useItemSearchInfo } from '@hooks/useItemSearchInfo';
import { useHandBookData } from '@hooks/useHandbookData';

const Cell: React.FC = () => {
  const {
    itemSearchInfo: { qualityFilter },
    setItemSearchInfo,
  } = useItemSearchInfo();

  const {
    handbookData: { items },
  } = useHandBookData();

  const onChange = (e: any) => {
    const cur = selectList[e.detail.value].replace('级', '');
    setItemSearchInfo((prev) => ({
      ...prev,
      qualityFilter: cur === '全部' ? '' : cur,
    }));
  };

  // 找到items里所有的pools并去重 注意pools是数组
  const selectList = Array.from(new Set(items.map((item) => item.quality)))
    .sort((a, b) => {
      const A = Number(a);
      const B = Number(b);
      if (A > B) {
        return -1;
      } else if (A < B) {
        return 1;
      } else {
        return 0;
      }
    })
    .map((item) => item + '级');

  selectList.unshift('全部');

  const showLabel = qualityFilter ? qualityFilter + '级' : '全部';

  return (
    <>
      <Picker
        mode="selector"
        range={selectList}
        onChange={onChange}
        value={selectList.indexOf(showLabel)}
      >
        <View className={styles.item}>
          <View className={styles.label}>道具品质</View>
          <View className={styles.value}>{showLabel}</View>
        </View>
      </Picker>
    </>
  );
};

export const QualityFilter = memo(Cell);
