import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { ItemSearchView } from '@components/ItemSearchView';

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
        <ItemSearchView supportSetting={false} showType="grid" type="trinket" />
      </View>
    </ErrorBoundary>
  );
}

export default Index;
