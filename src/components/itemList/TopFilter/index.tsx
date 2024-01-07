import React, { memo } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { ItemType } from 'src/types/handbook';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { Radio } from '@nutui/nutui-react-taro';
import { useCardSearchInfo } from '@hooks/useCardSearchInfo';

interface Props {
  type: ItemType;
  height?: string;
}

const Cell: React.FC<Props> = (props) => {
  const { height = '208rpx' } = props;

  const {
    cardSearchInfo: { lang },
    updateCardSearchInfo,
  } = useCardSearchInfo();

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const handleLangChange = (value: string) => {
    updateCardSearchInfo({ lang: value as 'zh' | 'en' });
  };

  return (
    <View className={styles.wrapper} style={{ height }}>
      <View
        className={styles.container}
        style={{ height: '104rpx', borderColor: themeColor.gridBorderColor }}
      >
        <View className={styles.lang}>
          <Radio.Group
            value={lang}
            onChange={handleLangChange}
            defaultValue="zh"
            direction="horizontal"
            style={{ '--nutui-radio-label-color': themeColor.textColor } as any}
          >
            <Radio value="zh">中文</Radio>
            <Radio value="en">英文</Radio>
          </Radio.Group>
        </View>
      </View>
    </View>
  );
};

export const TopFilter = memo(Cell);
