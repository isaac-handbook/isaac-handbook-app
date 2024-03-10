import React from 'react';
import { View } from '@tarojs/components';
import { Search, SearchProps } from './Search';
import { Setting } from '../../pages/index/components/Setting';
import styles from './index.module.scss';
import { ItemFilter } from '../../pages/index/components/ItemFilter';
import { useItemSearchInfo } from '@hooks/useItemSearchInfo';
import { Apps, List, Refresh } from '@nutui/icons-react-taro';
import classNames from 'classnames';
import { useTrinketSearchInfo } from '@hooks/useTrinketSearchInfo';
import { SideMenu } from '@components/SideMenu';
import { AchieveFilter } from '@pages/achieves/components/AchieveFilter';
import { useSetting } from '@hooks/useSetting';

export interface IndexTopNavProps extends SearchProps {
  supportSetting?: boolean;
}

export const IndexTopNav: React.FC<IndexTopNavProps> = (props) => {
  const { supportSetting = true, type } = props;

  const { hasFilterInfo: item_hasFilterInfo, resetFilter: item_resetFilter } =
    useItemSearchInfo();

  const {
    hasFilterInfo: trinket_hasFilterInfo,
    resetFilter: trinket_resetFilter,
  } = useTrinketSearchInfo();

  const {
    setting: { achieveViewMode },
    updateSetting,
  } = useSetting();

  const shouldShowReset =
    type === 'item' ? item_hasFilterInfo : trinket_hasFilterInfo;

  const handleReset = () => {
    if (type === 'item') {
      item_resetFilter({ refreshKeyword: true });
    } else {
      trinket_resetFilter();
    }
  };

  const handleChangeAchieveView = () => {
    updateSetting({
      achieveViewMode: achieveViewMode === 'list' ? 'grid' : 'list',
    });
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

      {type === 'achieve' && (
        <View
          onClick={handleChangeAchieveView}
          className={classNames(styles.icon, styles.refresh)}
        >
          {achieveViewMode === 'list' ? (
            <Apps size={'32rpx'} />
          ) : (
            <List size={'32rpx'} />
          )}
          <View className={styles.text}>视图</View>
        </View>
      )}

      <SideMenu />

      {type === 'item' && <ItemFilter />}
      {type === 'achieve' && <AchieveFilter />}
    </View>
  );
};
