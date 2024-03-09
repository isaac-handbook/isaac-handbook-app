import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { useHandBookData } from '@hooks/useHandbookData';
import { ChallegeItem } from './components/ChallengeItem';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const {
    handbookData: { challenge },
  } = useHandBookData();

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
        }}
      >
        <View className={styles.list}>
          {challenge.map((cha) => (
            <ChallegeItem challenge={cha} />
          ))}
        </View>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
