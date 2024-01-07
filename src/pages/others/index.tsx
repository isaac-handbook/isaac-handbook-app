import { Button, View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import Taro from '@tarojs/taro';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
      >
        <Button
          className={styles.btn}
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/suit/index`,
            })
          }
        >
          套装
        </Button>

        <Button
          className={styles.btn}
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/sacrifice-room/index`,
            })
          }
        >
          献祭房
        </Button>

        <Button
          className={styles.btn}
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/dice-room/index`,
            })
          }
        >
          骰子房
        </Button>

        <Button
          className={styles.btn}
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/boss-mark/index`,
            })
          }
        >
          通关标记
        </Button>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
