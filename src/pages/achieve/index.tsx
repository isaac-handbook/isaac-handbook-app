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
import { achieveTypeMap } from '@typers/handbook';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const { handbookData } = useHandBookData();

  const [{ keyword, achieveType, unlockItemType }] = useRecoilState(
    achieveSearchInfoState,
  );

  const achieveTypeIndex = achieveTypeMap[achieveType];

  const {
    setting: { achieveViewMode },
  } = useSetting();

  let showAchieveList = handbookData.achieve;

  // 关键字过滤
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

  // 游戏版本过滤
  if (achieveTypeIndex) {
    showAchieveList = showAchieveList.filter(
      (item) => item.type === achieveTypeIndex,
    );
  }

  // 解锁物品类型过滤
  if (unlockItemType && unlockItemType !== '全部') {
    showAchieveList = showAchieveList.filter((item) => {
      const { unlockItem } = item;
      if (unlockItem) {
        switch (unlockItemType) {
          case '道具':
            return unlockItem.includes('ID=c');
          case '角色':
            return unlockItem.includes('chara');
          case '饰品':
            return unlockItem.includes('ID=t');
          case '卡牌、符文、药丸':
            return unlockItem.includes('ID=k') || unlockItem.includes('ID=p');
          case '怪物':
            return unlockItem.includes('entity');
          case '挑战':
            return unlockItem.includes('挑战');
          case '宝宝':
            return unlockItem.includes('宝宝');
        }
      }
      return false;
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
    const renderData = [...rowData.items];
    // 如果不够 6 个，则补全
    if (renderData.length < 6) {
      renderData.push(...new Array(6 - renderData.length).fill({}));
    }
    return (
      <View className={styles.gridLine}>
        {renderData.map((achieve) => (
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
            itemHeight={achieveViewMode === 'list' ? 78 : 68}
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
