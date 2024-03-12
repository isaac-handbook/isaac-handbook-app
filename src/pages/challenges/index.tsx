import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { useHandBookData } from '@hooks/useHandbookData';
import { ChallengeItem } from './components/ChallengeItem';
import ErrorPage from '@components/ErrorBoundary/ErrorPage';
import { useShareMenu } from '@utils/hooks/useShareMenu';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const {
    handbookData: { challenges },
  } = useHandBookData();

  useShareMenu();

  if (!challenges?.length) {
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
          {challenges.map((cha) => (
            <ChallengeItem challenge={cha} />
          ))}
        </View>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
