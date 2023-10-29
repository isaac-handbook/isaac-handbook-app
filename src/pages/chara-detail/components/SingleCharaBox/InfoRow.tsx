import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { ContentTransformer } from '@components/ContentTransformer';

interface Props {
  label: string;
  value: string;
}

export const InfoRow: React.FC<Props> = ({ label, value }) => {
  return (
    <View className={styles.row}>
      <View className={styles.label}>{label}：</View>
      <View className={styles.value}>
        <ContentTransformer value={value} mathFontSize="12px" />
      </View>
    </View>
  );
};
