import React, { memo } from 'react';
import { Picker, View } from '@tarojs/components';
import styles from './index.module.scss';
import { useSetting } from '@hooks/useSetting';
import { GridIconSize } from '../../../../components/ItemGrid/constants';

type SelectItem = { value: GridIconSize; text: string };

const listData: SelectItem[] = [
  { value: 'grid-tiny', text: '很小' },
  { value: 'grid-small', text: '较小' },
  { value: 'grid-normal', text: '中等' },
  { value: 'grid-large', text: '较大' },
];

const Cell: React.FC = () => {
  const {
    setting: { gridIconSize },
    updateSetting,
  } = useSetting();

  const onChange = (e: any) => {
    updateSetting({ gridIconSize: listData[e.detail.value].value });
  };

  return (
    <>
      <Picker
        mode="selector"
        range={listData}
        rangeKey="text"
        onChange={onChange}
        value={listData.findIndex((item) => item.value === gridIconSize)}
      >
        <View className={styles.item}>
          <View className={styles.label}>图标大小</View>
          <View className={styles.value}>
            {listData.find((item) => item.value === gridIconSize)?.text}
          </View>
        </View>
      </Picker>
    </>
  );
};

export const GridIconSizeSetting = memo(Cell);
