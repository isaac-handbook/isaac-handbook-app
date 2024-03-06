import React, { memo } from 'react';
import { Picker, View } from '@tarojs/components';
import styles from './index.module.scss';
import { useAchieveSearchInfo } from '@hooks/useAchieveSearchInfo';

const achieveTypeList = [
  '道具',
  '饰品',
  '卡牌、符文、药丸',
  '角色',
  '怪物',
  '挑战',
  '宝宝',
];

const Cell: React.FC = () => {
  const {
    achieveSearchInfo: { unlockItemType },
    setAchieveSearchInfo,
  } = useAchieveSearchInfo();

  const onChange = (e: any) => {
    const cur: any = selectList[e.detail.value];
    setAchieveSearchInfo((prev) => ({
      ...prev,
      unlockItemType: cur,
    }));
  };

  const selectList: string[] = [...achieveTypeList].filter((item) => item);

  selectList.unshift('全部');

  return (
    <>
      <Picker
        mode="selector"
        range={selectList}
        onChange={onChange}
        value={selectList.indexOf(unlockItemType || '全部')}
      >
        <View className={styles.item}>
          <View className={styles.label}>解锁物品类型</View>
          <View className={styles.value}>{unlockItemType || '全部'}</View>
        </View>
      </Picker>
    </>
  );
};

export const UnlockItemTypeSelect = memo(Cell);
