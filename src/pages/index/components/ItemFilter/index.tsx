import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Drag, Popup } from '@nutui/nutui-react-taro';
import { Filter, Refresh } from '@nutui/icons-react-taro';
import { PoolFilter } from './PoolFilter';
import { TagFilter } from './TagFilter';
import { QualityFilter } from './QualityFilter';
import { ChargeFilter } from './ChargeFilter';
import { useItemSearchInfo } from '@hooks/useItemSearchInfo';
import { NeedUnlock } from './NeedUnlock';
import { drawerMaskColor } from '@src/styles';

export const ItemFilter: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  const { resetFilter } = useItemSearchInfo();

  return (
    <>
      <Popup
        closeable
        title="道具过滤"
        visible={visible}
        position="bottom"
        round
        onClose={() => {
          setVisible(false);
        }}
        zIndex={101}
        overlay={true}
        overlayStyle={{ backgroundColor: drawerMaskColor }}
        style={{ backgroundColor: '#f5f5f5' }}
        closeIcon={
          <View
            className={styles.icon}
            style={{
              marginTop: '12px',
              marginRight: '12px',
              color: '#000000E0',
              fontWeight: 'normal',
            }}
          >
            <Refresh size={'32rpx'} />
            <View className={styles.text}>重置</View>
          </View>
        }
        onCloseIconClick={(e) => {
          e.preventDefault();
          resetFilter({});
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

      <Drag
        direction="y"
        style={{ right: '0px', bottom: '480rpx', zIndex: '1!important' }}
      >
        <View className={styles.gateBtn} onClick={() => setVisible(true)}>
          <Filter color="#111" size={'28rpx'} />
          <View className={styles.gateText}>过滤</View>
        </View>
      </Drag>
    </>
  );
};
