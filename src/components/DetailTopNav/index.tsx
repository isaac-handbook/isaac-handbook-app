import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Home, ArrowDown } from '@nutui/icons-react-taro';
import Taro from '@tarojs/taro';
import { PoolsPopover } from './PoolsPopover';
import { Item } from 'src/types/handbook';
import { TagsPopover } from './TagsPopover';
import { ItemGridDrawer } from '@components/ItemGridDrawer';
import { Popover } from '@nutui/nutui-react-taro';
import classNames from 'classnames';

export interface Props {
  item: Item;
}

export const DetailTopNav: React.FC<Props> = (props) => {
  const { item } = props;
  let typeZh: string;
  switch (item.type) {
    case 'trinket':
      typeZh = '饰品';
      break;
    case 'card':
      typeZh = '卡牌';
      break;
    case 'pill':
      typeZh = '胶囊';
      break;
    default:
      typeZh = '道具';
      break;
  }

  const handleBackHome = () => {
    // 清除所有页面栈，并返回首页
    Taro.reLaunch({ url: '/pages/index/index' });
  };

  return (
    <View className={styles.container}>
      <View className={styles.cell}>
        <View className={styles.label}>类型</View>
        <View className={styles.value}>{typeZh}</View>
      </View>

      <View className={styles.cell}>
        <View className={styles.label}>ID</View>
        <View className={styles.value}>{item.id}</View>
      </View>

      {item.quality && item.type === 'item' && (
        <ItemGridDrawer
          qualityFilter={item.quality}
          title={'道具品质：' + item.quality + '级'}
          className={styles.topDrawerIcon}
        >
          <View className={styles.cell}>
            <View className={styles.label}>
              品质
              <ArrowDown style={{ marginLeft: '4rpx' }} size={10} />
            </View>
            <View className={classNames(styles.value, styles.link)}>
              {item.quality}级
            </View>
          </View>
        </ItemGridDrawer>
      )}

      {item.quality && item.type === 'pill' && (
        <View className={styles.cell}>
          <View className={styles.label}>药性</View>
          <View className={styles.value}>{item.quality}</View>
        </View>
      )}

      {item.tags?.length ? <TagsPopover tags={item.tags} /> : null}

      {item.pools?.length ? <PoolsPopover pools={item.pools} /> : null}

      <View className={styles.cell} onClick={handleBackHome}>
        <View className={styles.label}>首页</View>
        <View style={{ marginTop: '8rpx' }}>
          <Home size={'36rpx'} />
        </View>
      </View>

      {/* 这个Popover只为了引入样式 */}
      <View style={{ display: 'none' }}>
        <Popover />
      </View>
    </View>
  );
};
