import { View } from '@tarojs/components';

import styles from './index.module.scss';
import { ItemSearchView } from '../../components/ItemSearchView';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { SideNav } from '@components/SideNav';
import { useHandBookData } from '@hooks/useHandbookData';
import { UpdateNotice } from '@components/UpdateNotice';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  useHandBookData();

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{ backgroundColor: themeColor.bgColor }}
      >
        <ItemSearchView type="item" showType="grid" />
        <UpdateNotice />
      </View>
      <SideNav />
    </ErrorBoundary>
  );
}

export default Index;
