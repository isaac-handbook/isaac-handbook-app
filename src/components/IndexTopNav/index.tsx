import React from 'react';
import { View } from '@tarojs/components';
import { Search, SearchProps } from './Search';
import { Setting } from '../../pages/index/components/Setting';
import styles from './index.module.scss';
import { ItemFilter } from '../../pages/index/components/ItemFilter';
import { useItemSearchInfo } from '@hooks/useItemSearchInfo';
import { Home, Photograph, Refresh } from '@nutui/icons-react-taro';
import classNames from 'classnames';
import Taro from '@tarojs/taro';
import { useTrinketSearchInfo } from '@hooks/useTrinketSearchInfo';

export interface IndexTopNavProps extends SearchProps {
  supportFilter?: boolean;
  supportSetting?: boolean;
  supportBackHome?: boolean;
  supportColorFilter?: boolean;
}

export const IndexTopNav: React.FC<IndexTopNavProps> = (props) => {
  const {
    supportFilter = true,
    supportSetting = true,
    supportBackHome = false,
    supportColorFilter = false,
    type,
  } = props;

  const {
    hasFilterInfo: item_hasFilterInfo,
    resetFilter: item_resetFilter,
    updateItemSearchInfo,
    itemSearchInfo,
  } = useItemSearchInfo();

  const {
    hasFilterInfo: trinket_hasFilterInfo,
    resetFilter: trinket_resetFilter,
  } = useTrinketSearchInfo();

  const handleBackHome = () => {
    // 清除所有页面栈，并返回首页
    Taro.reLaunch({ url: '/pages/index/index' });
  };

  const toggleColorFilter = () => {
    // updateItemSearchInfo({
    //   openColorFilter: !itemSearchInfo.openColorFilter,
    // });
    // 跳转到 scan 页面
    Taro.navigateTo({ url: '/pages/scan/index' });
  };

  const shouldShowReset =
    type === 'item' ? item_hasFilterInfo : trinket_hasFilterInfo;

  const handleReset = () => {
    if (type === 'item') {
      item_resetFilter({ refreshKeyword: true });
    } else {
      trinket_resetFilter();
    }
  };

  return (
    <View className={styles.container}>
      {supportSetting && <Setting />}

      <Search type={props.type} marginLeft={supportSetting ? '' : '24rpx'} />

      {shouldShowReset && (
        <View
          onClick={handleReset}
          className={classNames(styles.icon, styles.refresh)}
        >
          <Refresh size={'32rpx'} />
          <View className={styles.text}>重置</View>
        </View>
      )}

      {type === 'item' && (
        <View
          onClick={toggleColorFilter}
          className={classNames(styles.icon, styles.refresh)}
        >
          <Photograph
            size={'32rpx'}
            className="nut-icon-am-breathe nut-icon-am-infinite"
          />
          <View className={styles.text}>识别</View>
        </View>
      )}

      {supportFilter && <ItemFilter />}

      {supportBackHome && (
        <View
          onClick={handleBackHome}
          className={styles.icon}
          // style={{ paddingLeft: '6rpx' }}
        >
          <Home size={'32rpx'} />
          <View className={styles.text}>首页</View>
        </View>
      )}
    </View>
  );
};
