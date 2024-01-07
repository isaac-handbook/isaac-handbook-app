import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { SideNav } from '@components/SideNav';
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
        <ItemSearchView
          supportFilter={false}
          supportSetting={false}
          supportColorFilter
          supportBackHome
          showType="grid"
          type="trinket"
        />
      </View>
      <SideNav />
    </ErrorBoundary>
  );
}

export default Index;
