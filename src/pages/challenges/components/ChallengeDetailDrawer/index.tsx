import React from 'react';
import { ScrollView, View } from '@tarojs/components';
import styles from './index.module.scss';
import { Popup } from '@nutui/nutui-react-taro';
import { useRecoilState } from 'recoil';
import { themeInfoState } from '@hooks/useThemeInfo';
import classNames from 'classnames';
import { drawerMaskColor } from '@src/styles';
import { Challenge } from '@typers/handbook';
import { ContentTransformer } from '@components/ContentTransformer';
import { Unlock } from '@pages/item-detail/components/Unlock';
import { PaperHeader } from '@pages/item-detail/components/PaperHeader';
import { B } from '@components/B';
import { useHandBookData } from '@hooks/useHandbookData';
import { LinkText } from '@components/LinkText';
import { wikiBaseUrl } from '@utils/wiki';

interface Props {
  challenge: Challenge;
  children: React.ReactNode;
}

export const ChallengeDetailDrawer: React.FC<Props> = (props) => {
  const { challenge } = props;

  const [showDrawer, setShowDrawer] = React.useState(false);

  const [{ themeColor }] = useRecoilState(themeInfoState);

  const {
    handbookData: { achieves },
  } = useHandBookData();

  const findAchieveByChallenge = () => {
    return achieves.find((ach) => ach.unlock?.includes(`挑战|${challenge.id}`));
  };

  const achieveData = findAchieveByChallenge();

  return (
    <>
      <View
        className={classNames(styles.children)}
        onClick={() => setShowDrawer(true)}
      >
        {props.children}
      </View>
      <Popup
        title={'挑战内容'}
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
              nameZh={challenge.nameZh}
              descZh={'挑战' + challenge.id + '：' + challenge.nameZh}
              type="oneRow"
            />
          </View>

          <View className={styles.unlock}>
            <Unlock unlock={challenge.unlock} />
          </View>

          <View className={styles.list}>
            <ContentTransformer
              value={'{{b|使用人物：}}' + challenge.useChara}
            />
          </View>

          <View className={styles.list}>
            <ContentTransformer
              value={'{{b|初始物品：}}' + (challenge.initialItems || '无')}
            />
          </View>

          <View className={styles.list}>
            <ContentTransformer
              value={'{{b|特殊规则：}}' + (challenge.specialRule || '无')}
            />
          </View>

          {achieveData && (
            <View className={styles.list}>
              <ContentTransformer
                value={'{{b|解锁内容：}}' + achieveData.unlockItem}
              />
            </View>
          )}

          <View className={styles.list}>
            <B>特殊房间：</B>
            {challenge.hasTreasureRoom ? '有' : '没有'}宝箱房，
            {challenge.hasShop ? '有' : '没有'}商店
          </View>

          <View className={styles.list}>
            <ContentTransformer
              value={'{{b|目的地：}}' + challenge.destination}
            />
          </View>

          <View className={styles.list}>
            <B>英文名：</B>
            {challenge.nameEn}
          </View>

          <View className={styles.list}>
            <LinkText
              value="点击复制 WIKI 链接"
              action="copy"
              copyValue={`${wikiBaseUrl}/wiki/挑战/${challenge.id}`}
            />
          </View>
        </ScrollView>
      </Popup>
    </>
  );
};
