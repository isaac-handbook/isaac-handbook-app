import React, { memo } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { useHandBookData } from '@hooks/useHandbookData';
import { ItemGridCell } from '@components/ItemGrid/ItemGridCell';

interface Props {
  otpItems: [string, number][];
}

const Cell: React.FC<Props> = (props) => {
  const { otpItems } = props;
  const { handbookData } = useHandBookData();

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  return (
    <View
      className={styles.container}
      style={{
        borderColor: themeColor.gridBorderColor,
        backgroundColor: themeColor.bgColor,
      }}
    >
      <View
        className={styles.tip}
        style={{
          background: themeColor.gridColor,
          color: themeColor.textColor,
        }}
      >
        提示：可以用两指放大缩小
      </View>
      <View className={styles.itemGrid}>
        {otpItems.slice(0, 15).map((arr) => {
          const item = handbookData.items.find((item) => item.id === arr[0]);
          if (!item) return null;
          return (
            <View
              className={styles.item}
              style={{ borderColor: themeColor.gridBorderColor }}
            >
              <ItemGridCell
                item={{ ...item, show: true }}
                // size="grid-normal"
                size="grid-large"
                key={item.id}
                themeColor={themeColor}
                showGridBorder={true}
                type="item"
              />
              {/* <View className={styles.extra}>{arr[1].toFixed(4)}</View> */}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export const ResultList = memo(Cell);
