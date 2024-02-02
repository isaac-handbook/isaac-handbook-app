import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Popup } from '@nutui/nutui-react-taro';
import { useRecoilState } from 'recoil';
import { themeInfoState } from '@hooks/useThemeInfo';
import { drawerMaskColor } from '@src/styles';
import { Ask } from '@nutui/icons-react-taro';

interface Props {}

export const Help: React.FC<Props> = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);

  const [{ themeColor }] = useRecoilState(themeInfoState);

  return (
    <>
      <View onClick={() => setShowDrawer(true)} className={styles.askBtn}>
        <View className={styles.inner}>
          <View className={styles.askIcon}>
            <Ask color={themeColor.textColor} size={14} />
          </View>
          规则
        </View>
      </View>
      <Popup
        title={'规则与帮助'}
        visible={showDrawer}
        position="bottom"
        round
        onClose={() => {
          setShowDrawer(false);
        }}
        closeable
        overlay={true}
        overlayStyle={{ backgroundColor: drawerMaskColor }}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
        lockScroll
        destroyOnClose
      >
        <View className={styles.drawer}>
          <View className={styles.title}>其他提示</View>
          <View className={styles.p}>
            1. 识别有 1~2s
            的延时。如果总是识别不上，可以试试放大图像或缩小白框。
          </View>
          <View className={styles.p}>
            2. 本功能处于试验阶段，后面会持续优化识别效果、加入更多功能。
          </View>
        </View>
      </Popup>
    </>
  );
};
