import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { CustomButton } from '@components/CustomButton';
import { forceReload } from '@utils/forceReload';
import { PerformanceSetting } from '@pages/index/components/Setting/PerformanceSetting';
import Taro from '@tarojs/taro';
import { getGlobalData } from '@src/global_data';
import { useState } from 'react';
import { Tag } from '@nutui/nutui-react-taro';
import { formatCharaName } from '@utils/formatCharaName';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  // 重新 render
  const [, update] = useState({});

  const handleDevChecker = () => {
    // 跳转到 dev-checker 页面
    Taro.navigateTo({
      url: '/pages/dev-checker/index',
    });
  };

  // 点击日志，跳转到 item-detail 页面
  const handleLogClick = (log: any) => {
    if (log.type === 'chara') {
      Taro.navigateTo({
        url: `/pages/chara-detail/index?charaName=${formatCharaName(log.nameZh)}`,
      });
      return;
    }
    Taro.navigateTo({
      url: `/pages/item-detail/index?itemId=${log.id}&type=${log.type}`,
    });
  };

  const transformerLogs = getGlobalData('transformerLogs');

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
      >
        <PerformanceSetting />
        <CustomButton
          style={{ marginTop: 0, height: '104rpx' }}
          value="清理所有缓存"
          onClick={forceReload}
        />
        <CustomButton
          style={{ marginTop: '24rpx', height: '104rpx' }}
          value="图鉴数据检测"
          onClick={handleDevChecker}
        />
        <CustomButton
          style={{ marginTop: '24rpx', height: '104rpx' }}
          value="刷新日志"
          onClick={() => update({})}
        />

        <View className={styles.logs}>
          <View style={{ marginBottom: '24rpx', marginTop: '48rpx' }}>
            transformer 日志
          </View>
          {transformerLogs.map((log) => (
            <View
              key={log.msg}
              className={styles.log}
              style={{ borderColor: themeColor.gridBorderColor }}
              onClick={() => handleLogClick(log)}
            >
              <View className={styles.logHeader}>
                {log.tagType && (
                  <Tag
                    type={log.tagType === 'danger' ? 'primary' : log.tagType}
                  >
                    {log.tagType}
                  </Tag>
                )}
                <View className={styles.logTitle}>{log.msg}</View>
              </View>
              <View className={styles.logContent}>{JSON.stringify(log)}</View>
            </View>
          ))}
        </View>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
