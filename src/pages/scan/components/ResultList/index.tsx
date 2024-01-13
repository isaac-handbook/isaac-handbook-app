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
      <View className={styles.itemGrid}>
        {otpItems.map((arr) => {
          const item = handbookData.items.find((item) => item.id === arr[0]);
          if (!item) return null;
          return (
            <View
              className={styles.item}
              style={{ borderColor: themeColor.gridBorderColor }}
            >
              <ItemGridCell
                item={{ ...item, show: true }}
                size="grid-normal"
                key={item.id}
                themeColor={themeColor}
                showGridBorder={true}
                type="item"
              />
              <View className={styles.extra}>{arr[1].toFixed(4)}</View>
            </View>
          );
        })}
        {/* {handbookData.items
          .filter((item) =>
            otpItems.map((arr) => arr[0]).includes(String(item.id)),
          )
          .map((item, index) => {
            return (
              <View
                className={styles.item}
                style={{ borderColor: themeColor.gridBorderColor }}
              >
                <ItemGridCell
                  item={{ ...item, show: true }}
                  size="grid-normal"
                  key={item.id}
                  themeColor={themeColor}
                  showGridBorder={true}
                  type="item"
                />
                <View className={styles.extra}>
                  {otpItems[index][1].toFixed(4)}
                </View>
              </View>
            );
          })} */}
      </View>
    </View>
  );
};

export const ResultList = memo(Cell);
