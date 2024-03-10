import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Curse } from '@typers/handbook';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { CurseDetailDrawer } from '../CurseDetailDrawer';

interface Props {
  curse: Curse;
}

export const CurseItem: React.FC<Props> = (props) => {
  const { curse } = props;

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  return (
    <View
      className={styles.item}
      style={{
        borderColor: themeColor.gridBorderColor + '80',
        color: themeColor.textColor,
      }}
    >
      <CurseDetailDrawer curse={curse} block />
    </View>
  );
};
