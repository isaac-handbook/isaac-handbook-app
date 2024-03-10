import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { useHandBookData } from '@hooks/useHandbookData';
import { SeedItem } from './components/SeedItem';
import ErrorPage from '@components/ErrorBoundary/ErrorPage';

let prevSeedType = '';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const {
    handbookData: { seeds },
  } = useHandBookData();

  if (!seeds?.length) {
    return <ErrorPage />;
  }

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
      >
        <View className={styles.list}>
          {seeds.map((seed, index) => {
            let prevSeedType_ = prevSeedType;
            prevSeedType = seed.seedType;
            return (
              <>
                {prevSeedType_ !== seed.seedType && (
                  <View className={styles.seedType}>{seed.seedType}</View>
                )}
                <SeedItem seed={seed} index={index} />
              </>
            );
          })}
        </View>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
