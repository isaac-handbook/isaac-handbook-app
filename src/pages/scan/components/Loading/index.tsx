import React, { memo } from 'react';
import { Button, View } from '@tarojs/components';
import styles from './index.module.scss';
import LoadingPage from '@components/ErrorBoundary/LoadingPage';
import { requestCameraPermission } from '@pages/scan/utils/permission';

interface Props {}

const Cell: React.FC<Props> = () => {
  return (
    <LoadingPage type="custom">
      <View className={styles.container}>
        <View className={styles.title}>请开启摄像头权限</View>
        <Button onClick={requestCameraPermission} type="default" size="default">
          点击尝试获取摄像头权限
        </Button>
      </View>
    </LoadingPage>
  );
};

export const Loading = memo(Cell);
