import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import Taro from '@tarojs/taro';
import { Result } from './components/Result';
import { useEffect } from 'react';
import { useExamPaper } from '@hooks/useExamPaper';

function Index() {
  const params = Taro.getCurrentInstance().router?.params as any;
  const level = params?.level;
  const seasonID = params?.seasonID;

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const { updateSingleExamPaperState } = useExamPaper();

  // 初始化广告实例
  useEffect(() => {
    if (Taro.createInterstitialAd) {
      const ad = Taro.createInterstitialAd({
        adUnitId: 'adunit-4b7bce40d44f6891',
      });
      ad.onLoad(() => {});
      ad.onError((err) => {
        console.error('插屏广告加载失败', err);
      });
      ad.onClose(() => {});
      updateSingleExamPaperState('examFinishAd', ad);
    }
  }, []);

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
      >
        <Result level={level} seasonID={seasonID} />
      </View>
    </ErrorBoundary>
  );
}

export default Index;
