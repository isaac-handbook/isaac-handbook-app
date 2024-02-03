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
          <View className={styles.title}>规则</View>
          <View className={styles.p}>
            1. 每一次答题的题目都是随机生成的，只有达到 60
            分及以上才能解锁下一个阶段。
          </View>
          <View className={styles.p}>
            2. 答题的过程中不要退出页面，否则会丢失答题进度。每道题有 20s
            的答题时间。
          </View>
          <View className={styles.p}>
            3. 所有题目均基于忏悔版本的游戏数据。
          </View>
          {/* <View className={styles.title}>帮助</View>
          <View className={styles.p}>
            1. 有题库吗？
            答：没有，大部分题目都是根据图鉴数据智能生成的，只有少数题目有人工介入。
          </View>
          <View className={styles.p}>
            2. 我的分数是否记录在云端？ 答：是的。和用户当前微信号绑定。
          </View> */}
          <View className={styles.title}>其他</View>
          <View className={styles.p}>
            后续会支持更多玩法、更有趣的题目。如果你有任何建议、或发现任何问题，欢迎联系开发者反馈。
          </View>
        </View>
      </Popup>
    </>
  );
};