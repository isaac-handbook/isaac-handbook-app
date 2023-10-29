import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import classNames from 'classnames';
import { StuffIcon } from '@components/StuffIcon';
import { stuffIconPositionMap } from '@constants';
import { ItemGridDrawer } from '@components/ItemGridDrawer';
import { Popover } from '@components/Popover';
import { RectDown } from '@nutui/icons-react-taro';
import { drawerMaskColor } from '@src/styles';

interface Props {
  pools: string[];
}

export const PoolsPopover: React.FC<Props> = ({ pools }) => {
  const [showDrawer, setShowDrawer] = React.useState(false);

  const list = pools.map((pool) => {
    const isGreed = pool.includes('贪婪');
    const poolName = isGreed ? pool.split('|')[1] : pool;
    return {
      key: pool,
      name: (
        <ItemGridDrawer poolFilter={pool} title={'道具池：' + pool}>
          <View style={{ width: '100%' }}>{pool.replace('|', ' ')}</View>
        </ItemGridDrawer>
      ),
      icon: (
        <StuffIcon
          location={stuffIconPositionMap[poolName]}
          top={8}
          scale={1.8}
          marginRight={12}
        />
      ),
    };
  });

  return (
    <>
      <View className="popoverWrapper">
        <Popover
          // @ts-ignore 传入组件而不是字符串
          list={list}
          round
          closeOnActionClick={false}
          closeOnOutsideClick={false}
          overlay={true}
          className={styles.popover}
          overlayStyle={{ backgroundColor: drawerMaskColor }}
          showArrow={false}
          visible={showDrawer}
          onClose={() => {
            setShowDrawer(false);
          }}
          onOverlayClick={() => {
            setShowDrawer(false);
          }}
          onOpen={() => setShowDrawer(true)}
        >
          <View className={styles.cell} style={{ height: '100%' }}>
            <View className={styles.label}>
              道具池
              <RectDown style={{ marginLeft: '4rpx' }} size={9} />
            </View>
            <View className={classNames(styles.value, styles.link)}>
              {pools.length}个
            </View>
          </View>
        </Popover>
      </View>
    </>
  );
};
