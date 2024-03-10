import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { useHandBookData } from '@hooks/useHandbookData';
import { DetailContent } from '@pages/item-detail/components/DetailContent';
import { useEffect, useState } from 'react';
import { ContentTransformer } from '@components/ContentTransformer';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const { handbookData } = useHandBookData();

  const [checkerIndex, setCheckIndex] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCheckIndex((prev) => prev + 1);
    }, 250);
  }, []);

  const checkItem = handbookData.items[checkerIndex];
  const checkTrinket = handbookData.trinkets[checkerIndex];
  const checkCard = handbookData.cards[checkerIndex];
  const checkPill = handbookData.pills[checkerIndex];
  const checkAchieve = handbookData.achieves[checkerIndex];
  const checkChallenge = handbookData.challenges[checkerIndex];
  const checkCurse = handbookData.extra.curses[checkerIndex];
  const checkSeed = handbookData.seeds[checkerIndex];
  const checkChara = Object.values(handbookData.chara)[checkerIndex];

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
      >
        <View>
          {checkItem ? (
            <>
              <View className={styles.checkerTitle}>
                道具检测：{checkerIndex} - {checkItem.nameZh}
              </View>
              <View className={styles.checkerContainer}>
                <DetailContent item={checkItem} />
              </View>
              <View className={styles.checkerContainer}>
                <ContentTransformer value={checkItem.unlock} />
              </View>
            </>
          ) : (
            <View className={styles.checkerTitle}>道具检测完成</View>
          )}

          {checkTrinket ? (
            <>
              <View className={styles.checkerTitle}>
                饰品检测：{checkerIndex} - {checkTrinket.nameZh}
              </View>
              <View className={styles.checkerContainer}>
                <DetailContent item={checkTrinket} />
              </View>
              <View className={styles.checkerContainer}>
                <ContentTransformer value={checkTrinket.unlock} />
              </View>
            </>
          ) : (
            <View className={styles.checkerTitle}>饰品检测完成</View>
          )}

          {checkCard ? (
            <>
              <View className={styles.checkerTitle}>
                卡牌检测：{checkerIndex} - {checkCard.nameZh}
              </View>
              <View className={styles.checkerContainer}>
                <DetailContent item={checkCard} />
              </View>
              <View className={styles.checkerContainer}>
                <ContentTransformer value={checkCard.unlock} />
              </View>
            </>
          ) : (
            <View className={styles.checkerTitle}>卡牌检测完成</View>
          )}

          {checkPill ? (
            <>
              <View className={styles.checkerTitle}>
                药丸检测：{checkerIndex} - {checkPill.nameZh}
              </View>
              <View className={styles.checkerContainer}>
                <DetailContent item={checkPill} />
              </View>
              <View className={styles.checkerContainer}>
                <ContentTransformer value={checkPill.unlock} />
              </View>
            </>
          ) : (
            <View className={styles.checkerTitle}>药丸检测完成</View>
          )}

          {checkChara ? (
            <>
              <View className={styles.checkerTitle}>
                角色检测：{checkerIndex} - {checkChara.nameZh}
              </View>
              <View className={styles.checkerContainer}>
                <DetailContent item={checkChara} />
              </View>
              <View className={styles.checkerContainer}>
                <ContentTransformer value={checkChara.unlock} />
              </View>
            </>
          ) : (
            <View className={styles.checkerTitle}>角色检测完成</View>
          )}

          {checkAchieve ? (
            <>
              <View className={styles.checkerTitle}>
                成就检测：{checkerIndex} - {checkAchieve.nameZh}
              </View>
              <View className={styles.checkerContainer}>
                <ContentTransformer value={checkAchieve.unlock} />
              </View>
              <View className={styles.checkerContainer}>
                <ContentTransformer value={checkAchieve.unlockItem} />
              </View>
            </>
          ) : (
            <View className={styles.checkerTitle}>成就检测完成</View>
          )}

          {checkChallenge ? (
            <>
              <View className={styles.checkerTitle}>
                挑战检测：{checkerIndex} - {checkChallenge.nameZh}
              </View>
              <View className={styles.checkerContainer}>
                <ContentTransformer value={checkChallenge.unlock} />
              </View>
              <View className={styles.checkerContainer}>
                <ContentTransformer value={checkChallenge.useChara} />
              </View>
              <View className={styles.checkerContainer}>
                <ContentTransformer value={checkChallenge.specialRule} />
              </View>
              <View className={styles.checkerContainer}>
                <ContentTransformer value={checkChallenge.initialItems} />
              </View>
              <View className={styles.checkerContainer}>
                <ContentTransformer value={checkChallenge.destination} />
              </View>
            </>
          ) : (
            <View className={styles.checkerTitle}>挑战检测完成</View>
          )}

          {checkCurse ? (
            <>
              <View className={styles.checkerTitle}>
                诅咒检测：{checkerIndex} - {checkCurse.nameZh}
              </View>
              <View className={styles.checkerContainer}>
                <DetailContent item={checkCurse} />
              </View>
            </>
          ) : (
            <View className={styles.checkerTitle}>诅咒检测完成</View>
          )}

          {checkSeed ? (
            <>
              <View className={styles.checkerTitle}>
                种子检测：{checkerIndex} - {checkSeed.nameZh}
              </View>
              <View className={styles.checkerContainer}>
                <ContentTransformer value={checkSeed.descZh} />
              </View>
            </>
          ) : (
            <View className={styles.checkerTitle}>种子检测完成</View>
          )}
        </View>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
