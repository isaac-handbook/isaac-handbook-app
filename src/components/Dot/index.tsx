import React, { CSSProperties, memo } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useThemeInfo } from '@hooks/useThemeInfo';

interface Props {
  themeColor: ReturnType<typeof useThemeInfo>['themeInfo']['themeColor'];
  level: number;
  value?: string;
}

const Cell: React.FC<Props> = (props) => {
  const { themeColor, level, value } = props;
  if (level === 0) {
    return null;
  }
  if (value === '{{table}}') {
    return null;
  }
  let dotType = 1;
  if ((level - 1) % 3 === 0) {
    dotType = 1;
  } else if ((level - 1) % 3 === 1) {
    dotType = 2;
  } else {
    dotType = 3;
  }
  const dotStyle: CSSProperties = {
    marginLeft: `${(level - 1) * 30}rpx`,
    backgroundColor: dotType === 2 ? 'transparent' : themeColor.textColor,
    borderColor: themeColor.textColor,
  };
  return (
    <View className={styles.dotWrapper}>
      <View className={styles[`dot-${dotType}`]} style={dotStyle}></View>
    </View>
  );
};

export const Dot = memo(Cell);
