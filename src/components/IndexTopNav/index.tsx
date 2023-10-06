import React from 'react';
import { View } from '@tarojs/components';
import { Search, SearchProps } from './Search';
import { Setting } from '../../pages/index/components/Setting';
import styles from './index.module.scss';
import { ItemFilter } from '../../pages/index/components/ItemFilter';

export interface IndexTopNavProps extends SearchProps {
  supportFilter?: boolean;
  supportSetting?: boolean;
}

export const IndexTopNav: React.FC<IndexTopNavProps> = (props) => {
  const { supportFilter = true, supportSetting = true } = props;

  return (
    <View className={styles.container}>
      {supportSetting && <Setting />}
      <Search type={props.type} margin={!supportFilter || !supportSetting} />
      {supportFilter && <ItemFilter />}
    </View>
  );
};
