import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { useHandBookData } from '@hooks/useHandbookData';
import { CurseItem } from './components/CurseItem';
import ErrorPage from '@components/ErrorBoundary/ErrorPage';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const {
    handbookData: {
      extra: { curses },
    },
  } = useHandBookData();

  if (!curses?.length) {
    return <ErrorPage />;
  }

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
        }}
      >
        <View className={styles.list}>
          {curses.map((cur) => (
            <CurseItem curse={cur} />
          ))}
        </View>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
