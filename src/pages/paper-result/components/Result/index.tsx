import React, { useEffect, useState } from 'react';
import { Image, View } from '@tarojs/components';
import styles from './index.module.scss';
import { useExamPaper } from '@hooks/useExamPaper';
import { useHandBookData } from '@hooks/useHandbookData';
import { ItemIcon } from '@components/ItemIcon';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { ResultDrawer } from '../ResultDrawer';
import { Topic } from '@typers/exam';
import { Item } from '@typers/handbook';
import { levelStringMap } from '@pages/paper/constant';
import { useUser } from '@hooks/useUser';
import Taro from '@tarojs/taro';
import { Tag } from '@nutui/nutui-react-taro';
import cup from '@assets/奖杯.png';

interface Props {
  level: number;
}

export const Result: React.FC<Props> = (props) => {
  const { level } = props;
  const {
    examPaper: { topicList, userAnswerList, userScoreMap, examFinishAd },
    getScore,
  } = useExamPaper();

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const { getItemDataById } = useHandBookData();

  const { user } = useUser();

  // 当前分数
  const [score, setScore] = useState(0);
  // 是否要展示【记录已更新】
  const [showUpdate, setShowUpdate] = useState(false);

  const [drawerData, setDrawerData] = useState<{
    visible: boolean;
    item?: Item;
    topic?: Topic;
    userSelect?: number | null;
  }>({
    visible: false,
  });

  useEffect(() => {
    if (!examFinishAd || !examFinishAd.show) return;
    // 执行广告
    examFinishAd
      .show()
      .then(() => {
        console.log('试卷结果插屏广告显示成功');
      })
      .catch((err) => {
        console.error('试卷结果插屏广告显示失败', err);
      });
  }, [examFinishAd]);

  // 完成后，展示分数、更新数据库
  useEffect(() => {
    if (!user?.openid) return;
    const curScore = getScore();
    setScore(curScore);
    // 更新数据库。如果试一次答当前 level，就插入一条新的记录。
    // 如果不是第一次答当前 level，就更新记录。
    const db = Taro.cloud.database();
    const col = db.collection('score');
    const queryRes = col.where({
      _openid: user.openid,
      level: Number(level),
    });
    queryRes.get().then((res) => {
      if (!res.data.length) {
        // 插入一条新的记录
        setShowUpdate(true);
        col.add({
          data: {
            level: Number(level),
            score: curScore,
            avatar: user.avatar,
            nickname: user.nickname,
          },
        });
      } else {
        // 如果当前分数比数据库里高，再更新
        if (curScore > res.data[0].score) {
          setShowUpdate(true);
          col.doc(res.data[0]._id as any).update({
            data: {
              score: curScore,
            },
          });
        }
      }
    });
  }, [user]);

  const handleItemClick = (topic: Topic, item: Item, index: number) => {
    setDrawerData({
      visible: true,
      item,
      topic,
      userSelect: userAnswerList[index],
    });
  };

  const shouldShowUnlocked = (() => {
    const oldScore = userScoreMap[`level${level}`];
    const newScore = score;
    if (oldScore < 60 && newScore >= 60) {
      return true;
    }
    return false;
  })();

  const shouldShowUnlocking = (() => {
    const oldScore = userScoreMap[`level${level}`];
    const newScore = score;
    if (oldScore < 60 && newScore < 60) {
      return true;
    }
    return false;
  })();

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <View className={styles.score}>
          <Image src={cup} className={styles.cup} />

          <View className={styles.number}>
            {score}
            <View className={styles.fen}>分</View>
          </View>

          <View className={styles.tags}>
            {showUpdate && (
              <Tag type="primary" className={styles.tagUpdate}>
                记录更新！
              </Tag>
            )}
            {shouldShowUnlocked && Number(level) !== 100 && (
              <Tag type="success" className={styles.tagSuccess}>
                下一关已解锁
              </Tag>
            )}
            {shouldShowUnlocking && Number(level) !== 100 && (
              <Tag type="warning" className={styles.tagWarning}>
                还差{60 - score}分解锁下一关
              </Tag>
            )}
          </View>
        </View>
      </View>

      <View className={styles.list}>
        <View className={styles.tip}>{levelStringMap[String(level)]}卷</View>
        {topicList.map((topic, index) => {
          const item = getItemDataById(
            (topic.itemType + 's') as any,
            topic.itemId,
          );
          if (!item) {
            return null;
          }
          const curSelected = userAnswerList[index];
          const correct = curSelected === topic.answer;
          return (
            <View
              className={styles.item}
              key={`key${index}`}
              onClick={() => handleItemClick(topic, item, index)}
            >
              <View className={styles.count}>{index + 1}</View>
              <View className={styles.content}>
                <ItemIcon
                  type={item.type}
                  id={item.id}
                  location={item.iconPosition}
                  size="grid-large"
                  scaleRate={0.8}
                />
                <View className={styles.name}>{item.nameZh}</View>
              </View>
              {correct ? (
                <Image
                  className={styles.answer}
                  src={require('../../../../assets/check.png')}
                />
              ) : (
                <Image
                  className={styles.answer}
                  src={require('../../../../assets/close.png')}
                />
              )}
              <View
                className={styles.line}
                style={{ backgroundColor: themeColor.gridBorderColor }}
              ></View>
            </View>
          );
        })}
      </View>

      <ResultDrawer
        drawerVisible={drawerData?.visible}
        closeDrawer={() =>
          setDrawerData((prev) => ({
            ...prev,
            visible: false,
          }))
        }
        topic={drawerData.topic}
        item={drawerData.item}
        userSelect={drawerData.userSelect}
      />
    </View>
  );
};
