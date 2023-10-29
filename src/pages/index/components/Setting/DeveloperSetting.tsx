import React, { memo } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useSetting } from '@hooks/useSetting';
import { forceReload } from '@utils/forceReload';
import { Button } from '@nutui/nutui-react-taro';

const Cell: React.FC = () => {
  const {
    setting: { developerMode },
  } = useSetting();

  if (!developerMode) {
    return null;
  }

  return (
    <View className={styles.item}>
      <Button onClick={forceReload}>清理所有缓存</Button>
    </View>
  );
};

export const DeveloperSetting = memo(Cell);
