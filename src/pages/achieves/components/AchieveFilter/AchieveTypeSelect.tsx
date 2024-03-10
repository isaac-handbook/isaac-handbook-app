import React, { memo } from 'react';
import { Picker, View } from '@tarojs/components';
import styles from './index.module.scss';
import { useAchieveSearchInfo } from '@hooks/useAchieveSearchInfo';
import { achieveTypeMap } from '@typers/handbook';

const achieveTypeList = Object.keys(achieveTypeMap);

const Cell: React.FC = () => {
  const {
    achieveSearchInfo: { achieveType },
    setAchieveSearchInfo,
  } = useAchieveSearchInfo();

  const onChange = (e: any) => {
    const cur: any = selectList[e.detail.value];
    setAchieveSearchInfo((prev) => ({
      ...prev,
      achieveType: cur,
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
        value={selectList.indexOf(achieveType || '全部')}
      >
        <View className={styles.item}>
          <View className={styles.label}>游戏版本</View>
          <View className={styles.value}>{achieveType || '全部'}</View>
        </View>
      </Picker>
    </>
  );
};

export const AchieveTypeSelect = memo(Cell);
