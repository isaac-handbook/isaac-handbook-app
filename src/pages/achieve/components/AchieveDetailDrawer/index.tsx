import React from 'react';
import { ScrollView, View } from '@tarojs/components';
import styles from './index.module.scss';
import { Popup } from '@nutui/nutui-react-taro';
import { useRecoilState } from 'recoil';
import { themeInfoState } from '@hooks/useThemeInfo';
import classNames from 'classnames';
import { drawerMaskColor } from '@src/styles';
import { Achieve, achieveTypeMapRe } from '@typers/handbook';
import { AchieveIcon } from '../AchieveIcon';
import { ContentTransformer } from '@components/ContentTransformer';
import { Unlock } from '@pages/item-detail/components/Unlock';
import { PaperHeader } from '@pages/item-detail/components/PaperHeader';

interface Props {
  achieve: Achieve;
  children: React.ReactNode;
}

export const AchieveDetailDrawer: React.FC<Props> = (props) => {
  const { achieve } = props;

  const [showDrawer, setShowDrawer] = React.useState(false);

  const [{ themeColor }] = useRecoilState(themeInfoState);

  return (
    <>
      <View
        className={classNames(styles.children)}
        onClick={() => setShowDrawer(true)}
      >
        {props.children}
      </View>
      <Popup
        title={achieve.nameZh}
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
          <View className={styles.icon}>
            <AchieveIcon achieve={achieve} scaleRate={1.2} />
          </View>
          <View className={styles.header}>
            <PaperHeader
              nameZh={achieve.nameZh}
              descZh={achieve.descZh}
              type="oneRow"
            />
          </View>
          <View className={styles.unlock}>
            <Unlock unlock={achieve.unlock} />
          </View>
          <View className={styles.list}>
            <ContentTransformer value={'解锁内容：' + achieve.unlockItem} />
          </View>
          <View className={styles.list}>
            游戏版本：{achieveTypeMapRe[achieve.type ?? '']}
          </View>
          <View className={styles.list}>成就ID：{achieve.id}</View>
          <View className={styles.list}>英文名：{achieve.nameEn}</View>
        </ScrollView>
      </Popup>
    </>
  );
};
