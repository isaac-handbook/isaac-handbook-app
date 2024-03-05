import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { useHandBookData } from '@hooks/useHandbookData';
import { AchieveItem } from './components/AchieveItem';
import VirtualList from '@components/VirtualList';
import { IndexTopNav } from '@components/IndexTopNav';
import { useRecoilState } from 'recoil';
import { achieveSearchInfoState } from '@hooks/useAchieveSearchInfo';
import { AchieveIcon } from './components/AchieveIcon';
import { useSetting } from '@hooks/useSetting';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const { handbookData } = useHandBookData();

  const [{ keyword }] = useRecoilState(achieveSearchInfoState);

  const {
    setting: { achieveViewMode },
  } = useSetting();

  let showAchieveList = handbookData.achieve;

  if (keyword) {
    showAchieveList = showAchieveList.filter((item) => {
      return (
        item.id.includes(keyword) ||
        item.nameZh.includes(keyword) ||
        item.nameEn.includes(keyword) ||
        item.descZh.includes(keyword) ||
        item.unlock.includes(keyword) ||
        item.unlockItem.includes(keyword) ||
        item.tmp?.includes(keyword)
      );
    });
  }

  let list: any[] = [];
  if (achieveViewMode === 'list') {
    list = showAchieveList.map((item) => ({
      type: 'item',
      item,
    }));
  } else {
    const columnCount = 6;
    // 补全后的格子数量
    const showingCellCount = showAchieveList.length;
    list = new Array(Math.ceil(showingCellCount / columnCount))
      .fill(0)
      .map((_, index) => {
        const curItems = showAchieveList.slice(
          index * columnCount,
          (index + 1) * columnCount,
        );
        return {
          type: 'items',
          items: curItems,
        };
      });
  }

  const itemRender = (rowData: any) => {
    if (rowData.type === 'item') {
      return <AchieveItem achieve={rowData.item} />;
    }
    return (
      <View className={styles.gridLine}>
        {rowData.items.map((achieve) => (
          <AchieveIcon achieve={achieve} scaleRate={0.92} clickable />
        ))}
      </View>
    );
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
        <View className={styles.list}>
          <VirtualList
            itemHeight={achieveViewMode === 'list' ? 80 : 68}
            data={list}
            renderRow={itemRender}
            loadHeight={1500}
            preloadHeight={375}
            height="calc(100vh - 104rpx)"
          />
        </View>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
