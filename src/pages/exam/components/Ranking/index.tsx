import React from 'react';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import { useThemeInfo } from '@hooks/useThemeInfo';
import Taro, { useDidShow } from '@tarojs/taro';
import emptyAvatar from '@assets/emptyAvatar.png';
import classNames from 'classnames';

interface RankItem {
  avatar: string;
  nickname: string;
  score: number;
  level: number;
  openid: string;
}

interface Props {}

export const Ranking: React.FC<Props> = () => {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const [rankList, setRankList] = React.useState<RankItem[]>([]);

  const updateRankList = async () => {
    // 查询 score 表，搜索 level=100，按照 score 降序排列，取前 100 条
    const db = Taro.cloud.database();
    const col = db.collection('score');
    col
      .where({ level: 100 })
      .orderBy('score', 'desc')
      .limit(100)
      .get()
      .then((res) => {
        const data = res.data;
        const rankList = data.map((item) => {
          return {
            avatar: item.avatar,
            nickname: item.nickname,
            score: item.score,
            level: item.level,
            openid: item._openid,
          };
        });
        setRankList(rankList);
      });
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

  return (
    <View
      className={styles.container}
      style={{
        backgroundColor: themeColor.bgColor,
        color: themeColor.textColor,
      }}
    >
      {rankList.map((item, index) => {
        return (
          <>
            <View key={`key${item.openid}${index}`} className={styles.item}>
              <View
                className={classNames(styles.count, {
                  [styles.medal]: index < 3,
                })}
              >
                {renderRankCount(index + 1)}
              </View>
              <View className={styles.avatar}>
                <Image
                  src={item.avatar || emptyAvatar}
                  className={styles.avatarImg}
                />
              </View>
              <View className={styles.name}> {item.nickname}</View>
              <View className={styles.score}>{item.score}</View>
            </View>
            <View
              className={styles.line}
              style={{ backgroundColor: themeColor.gridBorderColor }}
            ></View>
          </>
        );
      })}
    </View>
  );
};
