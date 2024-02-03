import { ContentTransformer } from '@components/ContentTransformer';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import styles from './index.module.scss';
import React from 'react';
import { Item } from '@typers/handbook';
import { useThemeInfo } from '@hooks/useThemeInfo';

interface Props {
  selected?: boolean;
  onClick: () => void;
  item: Item;
  optionValue: string;
  correctBg?: boolean;
  wrongBg?: boolean;
}

export const OptionItem: React.FC<Props> = (props) => {
  const { selected, onClick, item, optionValue, correctBg, wrongBg } = props;
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  let boxShadow = '';
  if (selected) {
    boxShadow =
      themeColor.type === 'dark'
        ? '0 0 6px rgba(255, 255, 255, 0.3)'
        : '0 0 6px rgba(0, 0, 0, 0.2)';
  }

  let borderColor = themeColor.gridColor;
  if (correctBg) {
    borderColor = '#52c41a';
  }
  if (wrongBg) {
    borderColor = '#ff4d4f';
  }

  return (
    <View
      className={classNames(styles.option, {
        [styles.selected]: selected,
      })}
      onClick={onClick}
      style={{
        background: themeColor.gridColor,
        color: themeColor.textColor,
        borderColor,
        boxShadow,
      }}
    >
      <View
        className={styles.check}
        style={{ borderColor: themeColor.textColor }}
      >
        {selected && (
          <View
            className={styles.checkIcon}
            style={{ backgroundColor: themeColor.textColor }}
          ></View>
        )}
      </View>
      <View className={styles.value}>
        <ContentTransformer
          id={item.id}
          nameZh={item.nameZh}
          value={String(optionValue)}
          linkable={false}
          lineHeight="60rpx"
        />
      </View>
    </View>
  );
};
