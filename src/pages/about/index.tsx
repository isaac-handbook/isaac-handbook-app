import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{ backgroundColor: themeColor.bgColor }}
      >
        关于页面
      </View>
    </ErrorBoundary>
  );
}

export default Index;
