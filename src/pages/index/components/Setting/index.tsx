import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Button, Popup } from '@nutui/nutui-react-taro';
import { GridIconSizeSetting } from './GridIconSizeSetting';
import { PerformanceSetting } from './PerformanceSetting';
import { SortMethodSetting } from './SortMethodSetting';
import { Setting as SettingIcon, User } from '@nutui/icons-react-taro';
import { ThemeSetting } from './ThemeSetting';
import { GridBorderSetting } from './GridBorderSetting';
import { DeveloperSetting } from './DeveloperSetting';
import Taro from '@tarojs/taro';
import { useHandBookData } from '@hooks/useHandbookData';
import { drawerMaskColor } from '@src/styles';

export const Setting: React.FC = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);

  const { forceRefresh } = useHandBookData();

  const handleForceRefresh = () => {
    forceRefresh();
  };

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
        overlayStyle={{ backgroundColor: drawerMaskColor }}
        closeIcon={
          <View
            className={styles.icon}
            style={{
              marginTop: 4,
              marginRight: 4,
              color: '#000000E0',
              fontWeight: 'normal',
            }}
          >
            <User size={'32rpx'} />
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

          <Button
            style={
              {
                width: '100%',
                marginBottom: '8px',
                '--nutui-button-border-width': '0px',
                '--nutui-button-default-height': '48px',
                '--nutui-button-default-font-size': '16px',
                '--nutui-button-default-background-color': '#ffffff',
              } as any
            }
            onClick={handleForceRefresh}
          >
            刷新图鉴数据
          </Button>

          <PerformanceSetting />

          <DeveloperSetting />
        </View>
      </Popup>
    </>
  );
};
