import { View } from '@tarojs/components';

import styles from './index.module.scss';
import { ItemSearchView } from '../../components/ItemSearchView';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { SideNav } from '@components/SideNav';
import { UpdateNotice } from '@components/UpdateNotice';
import { useHandbookInit } from '@hooks/useHandbookInit';
import { useExamInit } from '@hooks/useExamInit';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  useHandbookInit();
  useExamInit();

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{ backgroundColor: themeColor.bgColor }}
      >
        <ItemSearchView supportColorFilter type="item" showType="grid" />
        <UpdateNotice />
      </View>
      <SideNav />
    </ErrorBoundary>
  );
}

export default Index;
