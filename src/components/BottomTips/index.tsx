import React, { memo } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useThemeInfo } from '@hooks/useThemeInfo';

interface Props {
  themeColor: ReturnType<typeof useThemeInfo>['themeInfo']['themeColor'];
  count: number;
}

const Cell: React.FC<Props> = (props) => {
  const { themeColor, count } = props;

  return (
    <View
      className={styles.bottomTips}
      style={{
        backgroundColor: themeColor.gridColor,
        color: themeColor.textColor,
      }}
    >
      当前展示数量：{count}
    </View>
  );
};

export const BottomTips = memo(Cell);
