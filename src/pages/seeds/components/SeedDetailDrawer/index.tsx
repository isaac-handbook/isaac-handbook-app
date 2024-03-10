import React from 'react';
import { ScrollView, View } from '@tarojs/components';
import styles from './index.module.scss';
import { Popup } from '@nutui/nutui-react-taro';
import { useRecoilState } from 'recoil';
import { themeInfoState } from '@hooks/useThemeInfo';
import classNames from 'classnames';
import { drawerMaskColor } from '@src/styles';
import { Seed } from '@typers/handbook';
import { ContentTransformer } from '@components/ContentTransformer';
import { Unlock } from '@pages/item-detail/components/Unlock';
import { PaperHeader } from '@pages/item-detail/components/PaperHeader';
import { B } from '@components/B';
import { LockAchieveImg } from '@components/LockAchieveImg';

interface Props {
  seed: Seed;
  children: React.ReactNode;
}

export const SeedDetailDrawer: React.FC<Props> = (props) => {
  const { seed } = props;

  const [showDrawer, setShowDrawer] = React.useState(false);

  const [{ themeColor }] = useRecoilState(themeInfoState);

  // 给种子的第四位后面加一个空格
  const showSeedCode = seed.seedCode.replace(/(.{4})/g, '$1 ');

  return (
    <>
      <View
        className={classNames(styles.children)}
        onClick={() => setShowDrawer(true)}
      >
        {props.children}
      </View>
      <Popup
        title={'种子内容'}
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
        <ScrollView className={styles.drawer} scrollY>
          <View className={styles.header}>
            <PaperHeader
              nameZh={seed.nameZh}
              descZh={showSeedCode}
              type="oneRow"
              line1Style={{ fontSize: '40rpx' }}
            />
          </View>

          <View className={styles.unlock}>
            <Unlock unlock={seed.unlock} />
          </View>

          <View className={styles.list}>
            <B>描述：</B>
            {seed.nameZh}
          </View>

          <View className={styles.list}>
            <B>成就：</B>
            {seed.supportAchieve ? '支持解锁成就' : '不支持解锁成就'}
            {!seed.supportAchieve && <LockAchieveImg />}
          </View>

          <View className={styles.list}>
            <ContentTransformer value={'{{b|效果：}}' + seed.descZh} />
          </View>

          <View className={styles.list}>
            <B>类别：</B>
            {seed.seedType}
          </View>

          <View className={styles.list}>
            <B>英文名：</B>
            {seed.nameEn}
          </View>
        </ScrollView>
      </Popup>
    </>
  );
};
