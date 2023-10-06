import React, { memo } from 'react';
import { Picker, View } from '@tarojs/components';
import styles from './index.module.scss';
import { useItemSearchInfo } from '@hooks/useItemSearchInfo';
import { useHandBookData } from '@hooks/useHandbookData';

// 一些特定的顺序
const order = [
  '恶魔房',
  '天使房',
  '宝箱房',
  '头目房',
  '商店',
  '诅咒房',
  '隐藏房',
  '图书馆',
  '挑战房',
  '星象房',
];

const Cell: React.FC = () => {
  const {
    itemSearchInfo: { poolFilter },
    setItemSearchInfo,
  } = useItemSearchInfo();

  const {
    handbookData: { items },
  } = useHandBookData();

  const onChange = (e: any) => {
    const cur = selectList[e.detail.value];
    setItemSearchInfo((prev) => ({
      ...prev,
      poolFilter: cur === '全部' ? '' : cur,
    }));
  };

  // 找到items里所有的pools并去重 注意pools是数组
  const selectList = Array.from(
    new Set(
      items
        .map((item) => item.pools)
        .reduce((prev, cur) => {
          return prev.concat(cur);
        }, []),
    ),
  );

  // order中的排在最前面
  // “贪婪”开头的都排在order的内容的后面
  // 其他的按照原有顺序排列
  selectList.sort((a, b) => {
    const A = order.indexOf(a);
    const B = order.indexOf(b);
    if (A > -1 && B > -1) {
      if (A > B) {
        return 1;
      } else if (A < B) {
        return -1;
      } else {
        return 0;
      }
    } else if (A > -1) {
      return -1;
    } else if (B > -1) {
      return 1;
    } else if (a.startsWith('贪婪') && b.startsWith('贪婪')) {
      return 0;
    } else if (a.startsWith('贪婪')) {
      return 1;
    } else if (b.startsWith('贪婪')) {
      return -1;
    } else {
      return 0;
    }
  });

  selectList.unshift('全部');

  return (
    <>
      <Picker
        mode="selector"
        range={selectList}
        onChange={onChange}
        value={selectList.indexOf(poolFilter || '全部')}
      >
        <View className={styles.item}>
          <View className={styles.label}>道具池</View>
          <View className={styles.value}>{poolFilter || '全部'}</View>
        </View>
      </Picker>
    </>
  );
};

export const PoolFilter = memo(Cell);
