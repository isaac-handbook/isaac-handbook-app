import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { useHandBookData } from '@hooks/useHandbookData';
import { AchieveItem } from './components/AchieveItem';
import VirtualList from '@components/VirtualList';
import { ItemListVirtualListItem } from '@typers/handbook';
import { IndexTopNav } from '@components/IndexTopNav';
import { useRecoilState } from 'recoil';
import { achieveSearchInfoState } from '@hooks/useAchieveSearchInfo';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const { handbookData } = useHandBookData();

  const [{ keyword }] = useRecoilState(achieveSearchInfoState);

  let showAchieveList = handbookData.achieve;

  if (keyword) {
    showAchieveList = showAchieveList.filter((item) => {
      return (
        item.id.includes(keyword) ||
        item.unlock.includes(keyword) ||
        item.unlockItem.includes(keyword) ||
        item.tmp?.includes(keyword)
      );
    });
  }

  const list = showAchieveList.map((item) => ({
    type: 'item',
    item,
  }));

  const itemRender = (rowData: ItemListVirtualListItem) => {
    return <AchieveItem achieve={rowData.item} />;
  };

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
        }}
      >
        <IndexTopNav type="achieve" supportSetting={false} />
        <View
          className={styles.header}
          style={{
            backgroundColor: themeColor.appColor,
          }}
        >
          <View className={styles.id}>ID</View>
          <View className={styles.unlock}>解锁条件</View>
          <View className={styles.unlockItem}>解锁内容</View>
        </View>
        <View className={styles.list}>
          <VirtualList
            itemHeight={84}
            data={list}
            renderRow={itemRender}
            loadHeight={1500}
            preloadHeight={375}
            height="calc(100vh - 180rpx)"
          />
        </View>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
