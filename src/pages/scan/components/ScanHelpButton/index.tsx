import React, { useEffect } from 'react';
import { Button, View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import { Popup } from '@nutui/nutui-react-taro';
import { useRecoilState } from 'recoil';
import { themeInfoState } from '@hooks/useThemeInfo';
import { drawerMaskColor } from '@src/styles';
import { Ask, ThumbsDown, ThumbsUp } from '@nutui/icons-react-taro';
import style_scanPage from '../../index.module.scss';
import good1 from './assets/good1.png';
import good2 from './assets/good2.png';
import good3 from './assets/good3.png';
import bad1 from './assets/bad1.png';
import bad2 from './assets/bad2.png';
import bad3 from './assets/bad3.png';
import Taro from '@tarojs/taro';

interface Props {
  portal: any;
}

export const ScanHelpButton: React.FC<Props> = (props) => {
  const [showDrawer, setShowDrawer] = React.useState(false);

  const [{ themeColor }] = useRecoilState(themeInfoState);

  useEffect(() => {
    // 通过微信缓存判断当前是否要自动弹出一次
    setTimeout(() => {
      const show = Taro.getStorageSync('scanHelpAutoShow');
      if (!show) {
        setShowDrawer(true);
        Taro.setStorageSync('scanHelpAutoShow', true);
      }
    }, 1000);
  }, []);

  return (
    <>
      <Button
        onClick={() => setShowDrawer(true)}
        className={style_scanPage.bubble}
        style={{
          backgroundColor: themeColor.gridColor,
          color: themeColor.textColor,
        }}
      >
        <Ask color={themeColor.textColor} size={25} />
      </Button>
      <Popup
        title={'识别帮助'}
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
        portal={props.portal.current}
      >
        <View className={styles.drawer}>
          <View className={styles.title}>如何使用</View>
          <View className={styles.caseRow}>
            <Image src={good1} className={styles.img} />
            <Image src={good2} className={styles.img} />
            <Image src={good3} className={styles.img} />
          </View>
          <View className={styles.caseRow}>
            <View className={styles.tip}>
              <ThumbsUp size={22} color="#52c41a" className={styles.judge} />
              优秀
            </View>
            <View className={styles.tip}>
              <ThumbsUp size={22} color="#52c41a" className={styles.judge} />
              优秀
            </View>
            <View className={styles.tip}>
              <ThumbsUp size={22} color="#52c41a" className={styles.judge} />
              优秀
            </View>
          </View>
          <View className={styles.caseRow}>
            <Image src={bad1} className={styles.img} />
            <Image src={bad2} className={styles.img} />
            <Image src={bad3} className={styles.img} />
          </View>
          <View className={styles.caseRow}>
            <View className={styles.tip}>
              <ThumbsDown size={22} color="#ff4d4f" className={styles.judge} />
              歪了
            </View>
            <View className={styles.tip}>
              <ThumbsDown size={22} color="#ff4d4f" className={styles.judge} />
              距离太远
            </View>
            <View className={styles.tip}>
              <ThumbsDown size={22} color="#ff4d4f" className={styles.judge} />
              光线不好
            </View>
          </View>

          <View className={styles.margin}></View>

          <View className={styles.title}>其他提示</View>
          <View className={styles.p}>
            1. 识别有 1~2s
            的延时。如果总是识别不上，可以尝试放大图像（超出白框一点也可以）。
          </View>
          <View className={styles.p}>
            2.
            本功能目前处于实验阶段，可能存在识别不准等情况。后续会持续优化识别效果。
          </View>
          <View className={styles.p}>
            3. 手机摄像头比较费电，请注意不要过长时间停留在本页面。
          </View>
        </View>
      </Popup>
    </>
  );
};
