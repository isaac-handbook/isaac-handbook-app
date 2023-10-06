import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Popup } from '@nutui/nutui-react-taro';
import { Horizontal, Refresh2 } from '@nutui/icons-react-taro';
import { PoolFilter } from './PoolFilter';
import { TagFilter } from './TagFilter';
import { QualityFilter } from './QualityFilter';
import { ChargeFilter } from './ChargeFilter';
import { useItemSearchInfo } from '@hooks/useItemSearchInfo';
import { NeedUnlock } from './NeedUnlock';

export const ItemFilter: React.FC = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);

  const { resetFilter } = useItemSearchInfo();

  return (
    <>
      <View className={styles.icon} onClick={() => setShowDrawer(true)}>
        <Horizontal size={'32rpx'} />
        <View className={styles.text}>筛选</View>
      </View>
      <Popup
        closeable
        title="道具过滤"
        visible={showDrawer}
        position="bottom"
        round
        onClose={() => {
          setShowDrawer(false);
        }}
        overlay={true}
        overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        style={{ backgroundColor: '#f5f5f5' }}
        closeIcon={
          <View
            className={styles.icon}
            style={{ padding: '0', color: '#000000E0', fontWeight: 'normal' }}
          >
            <Refresh2 size={'32rpx'} />
            <View className={styles.text}>重置</View>
          </View>
        }
        onCloseIconClick={(e) => {
          e.preventDefault();
          resetFilter();
        }}
      >
        <View className={styles.drawer}>
          <PoolFilter />
          <TagFilter />
          <QualityFilter />
          <ChargeFilter />
          <NeedUnlock />
        </View>
      </Popup>
    </>
  );
};
