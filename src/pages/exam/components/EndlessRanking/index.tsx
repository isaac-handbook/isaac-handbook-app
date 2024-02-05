import React from 'react';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import { useThemeInfo } from '@hooks/useThemeInfo';
import Taro, { useDidShow } from '@tarojs/taro';
import emptyAvatar from '@assets/emptyAvatar.png';
import classNames from 'classnames';
import { useUser } from '@hooks/useUser';
import { useSetting } from '@hooks/useSetting';
import { useApp } from '@hooks/useApp';

interface RankItem {
  avatar: string;
  nickname: string;
  score: number;
  level: number;
  openid: string;
}

interface Props {}

export const EndlessRanking: React.FC<Props> = () => {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const {
    user: { openid },
  } = useUser();

  const {
    setting: { developerMode },
  } = useSetting();

  const {
    app: { examConfig },
  } = useApp();

  const [hide, setHide] = React.useState(true);

  const [rankList, setRankList] = React.useState<RankItem[]>([]);

  const updateRankList = async () => {
    // 通过云函数查询 rankList
    const res = (await Taro.cloud.callFunction({
      name: 'endlessRank',
    })) as any;
    setRankList(res?.result?.rankList || []);
  };

  useDidShow(() => {
    updateRankList();
  });

  const renderRankCount = (count: number) => {
    switch (count) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return count;
    }
  };

  // 开发者模式，点击头像可进行操作
  const handleAvatarClick = (curOpenid: string) => {
    if (!developerMode) {
      return;
    }
    Taro.setClipboardData({
      data: curOpenid,
      success: () => {
        Taro.showToast({
          title: '已复制 openid',
          icon: 'none',
        });
      },
    });
  };

  const boxShadow =
    themeColor.type === 'dark'
      ? '0 0 6px rgba(255, 255, 255, 0.3)'
      : '0 0 6px rgba(0, 0, 0, 0.2)';

  return (
    <>
      <View className={styles.wangzheTitle}>
        彩蛋：无尽榜
        <View className={styles.wangzheTip}>{examConfig.endlessRankTip}</View>
      </View>
      <View
        className={styles.container}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
      >
        {rankList.slice(0, hide ? 10 : 100).map((item, index) => {
          const mine = item.openid === openid;
          return (
            <>
              <View
                key={`key${item.openid}${index}`}
                className={styles.item}
                style={{ boxShadow: mine ? boxShadow : '' }}
              >
                <View
                  className={classNames(styles.count, {
                    [styles.medal]: index < 3,
                  })}
                >
                  {renderRankCount(index + 1)}
                </View>
                <View
                  className={styles.avatar}
                  onClick={() => handleAvatarClick(item.openid)}
                >
                  <Image
                    src={item.avatar || emptyAvatar}
                    className={styles.avatarImg}
                  />
                </View>
                <View className={styles.name}> {item.nickname}</View>
                <View className={styles.score}>
                  {item.score}
                  <View className={styles.fen}>分</View>
                </View>
              </View>
              <View
                className={styles.line}
                style={{ backgroundColor: themeColor.gridBorderColor }}
              ></View>
            </>
          );
        })}

        {rankList.length === 0 && (
          <>
            {' '}
            <View className={styles.item}>
              <View className={styles.count}>?</View>
              <View className={styles.avatar}>
                <Image src={emptyAvatar} className={styles.avatarImg} />
              </View>
              <View className={styles.name}> ????</View>
              <View className={styles.score}>
                ??
                <View className={styles.fen}>分</View>
              </View>
            </View>
            <View
              className={styles.line}
              style={{ backgroundColor: themeColor.gridBorderColor }}
            ></View>
          </>
        )}
      </View>
    </>
  );
};
