import React from 'react';
import { View } from '@tarojs/components';
import { Search, SearchProps } from './Search';
import { Setting } from '../../pages/index/components/Setting';
import styles from './index.module.scss';
import { ItemFilter } from '../../pages/index/components/ItemFilter';
import { useItemSearchInfo } from '@hooks/useItemSearchInfo';
import { Home, Refresh2 } from '@nutui/icons-react-taro';
import classNames from 'classnames';
import Taro from '@tarojs/taro';

export interface IndexTopNavProps extends SearchProps {
  supportFilter?: boolean;
  supportSetting?: boolean;
  supportBackHome?: boolean;
}

export const IndexTopNav: React.FC<IndexTopNavProps> = (props) => {
  const {
    supportFilter = true,
    supportSetting = true,
    supportBackHome = false,
  } = props;

  const { hasFilterInfo, resetFilter } = useItemSearchInfo();

  const handleBackHome = () => {
    // 清除所有页面栈，并返回首页
    Taro.reLaunch({ url: '/pages/index/index' });
  };

  return (
    <View className={styles.container}>
      {supportSetting && <Setting />}

      <Search type={props.type} margin={!supportFilter || !supportSetting} />

      {supportFilter && hasFilterInfo && (
        <View
          onClick={() => resetFilter({ refreshKeyword: true })}
          className={classNames(styles.icon, styles.refresh)}
        >
          <Refresh2 size={'32rpx'} />
          <View className={styles.text}>重置</View>
        </View>
      )}

      {supportFilter && <ItemFilter />}

      {supportBackHome && (
        <View
          onClick={handleBackHome}
          className={styles.icon}
          style={{ paddingLeft: '6rpx' }}
        >
          <Home size={'32rpx'} />
          <View className={styles.text}>首页</View>
        </View>
      )}
    </View>
  );
};
