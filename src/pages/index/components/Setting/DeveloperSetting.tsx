import React, { memo } from 'react';
import { Button, View } from '@tarojs/components';
import styles from './index.module.scss';
import { useHandBookData } from '@hooks/useHandbookData';
import { useSetting } from '@hooks/useSetting';
import { forceReload } from '@utils/forceReload';

const Cell: React.FC = () => {
  const {
    setting: { developerMode },
  } = useSetting();
  const { forceRefresh } = useHandBookData();

  const handleForceRefresh = () => {
    forceRefresh();
  };

  if (!developerMode) {
    return null;
  }

  return (
    <View className={styles.item}>
      <Button size="mini" onClick={handleForceRefresh}>
        刷新图鉴数据
      </Button>
      <Button size="mini" onClick={forceReload}>
        清理所有缓存
      </Button>
    </View>
  );
};

export const DeveloperSetting = memo(Cell);
