import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Popup } from '@nutui/nutui-react-taro';
import { useRecoilState } from 'recoil';
import { themeInfoState } from '@hooks/useThemeInfo';
import { ContentTransformer } from '@components/ContentTransformer';
import { drawerMaskColor } from '@src/styles';
import { useHandBookData } from '@hooks/useHandbookData';

interface Props {}

export const ReviveDrawer: React.FC<Props> = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);

  const [{ themeColor }] = useRecoilState(themeInfoState);
  const { handbookData } = useHandBookData();

  return (
    <>
      <View className={styles.link} onClick={() => setShowDrawer(true)}>
        点击查看多个复活相关物品的复活顺序
      </View>
      <Popup
        title={'复活顺序'}
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
          死亡时会优先使用顺序靠前的物品：
          {handbookData.extra.revive.map((re) => (
            <ContentTransformer value={re} />
          ))}
        </View>
      </Popup>
    </>
  );
};
