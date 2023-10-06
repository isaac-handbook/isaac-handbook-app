import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Popup } from '@nutui/nutui-react-taro';
import { GridIconSizeSetting } from './GridIconSizeSetting';
import { PerformanceSetting } from './PerformanceSetting';
import { SortMethodSetting } from './SortMethodSetting';
import { My, Setting as SettingIcon } from '@nutui/icons-react-taro';
import { ThemeSetting } from './ThemeSetting';
import { GridBorderSetting } from './GridBorderSetting';
import { DeveloperSetting } from './DeveloperSetting';
import Taro from '@tarojs/taro';

export const Setting: React.FC = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);

  return (
    <>
      <View className={styles.icon} onClick={() => setShowDrawer(true)}>
        <SettingIcon size={'34rpx'} />
        <View className={styles.text}>设置</View>
      </View>
      <Popup
        title="设置"
        visible={showDrawer}
        position="bottom"
        round
        onClose={() => {
          setShowDrawer(false);
        }}
        closeable
        overlay={true}
        overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        closeIcon={
          <View
            className={styles.icon}
            style={{ padding: '0', color: '#000000E0', fontWeight: 'normal' }}
          >
            <My size={'32rpx'} />
            <View className={styles.text}>关于</View>
          </View>
        }
        onCloseIconClick={(e) => {
          e.preventDefault();
          // 跳转到关于页面
          Taro.navigateTo({
            url: `/pages/about/index`,
          });
        }}
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <View className={styles.drawer}>
          <GridIconSizeSetting />
          <SortMethodSetting />
          <ThemeSetting />
          <GridBorderSetting />
          <PerformanceSetting />
          <DeveloperSetting />
        </View>
      </Popup>
    </>
  );
};
