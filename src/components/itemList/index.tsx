import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { useHandBookData } from '@hooks/useHandbookData';
import styles from './index.module.scss';
import { ItemListCell } from './ItemListCell';
import { settingInfoState } from '@hooks/useSetting';
import { Item, ItemListVirtualListItem, ItemType } from 'src/types/handbook';
import VirtualList from '@components/VirtualList';
import { themeInfoState } from '@hooks/useThemeInfo';
import { cardSearchInfoState } from '@hooks/useCardSearchInfo';
import { pillSearchInfoState } from '@hooks/usePillSearchInfo';
import { useRecoilState } from 'recoil';
import { BottomTips } from '@components/BottomTips';
import { TopFilter } from './TopFilter';

export interface ItemListProps {
  type: ItemType;
}

export const ItemList: React.FC<ItemListProps> = (props) => {
  const { handbookData } = useHandBookData();

  const [{ performance }] = useRecoilState(settingInfoState);

  const [{ themeColor }] = useRecoilState(themeInfoState);

  const [{ keyword: cardKeyword, lang }] = useRecoilState(cardSearchInfoState);
  const [{ keyword: pillKeyword }] = useRecoilState(pillSearchInfoState);

  let keyword: string = '';
  let initDataList: Item[] = [];
  // 卡牌
  if (props.type === 'card') {
    keyword = cardKeyword;
    initDataList = handbookData.cards;
  }
  // 胶囊
  if (props.type === 'pill') {
    keyword = pillKeyword;
    initDataList = handbookData.pills;
  }

  const scrollRef = React.useRef<any>();

  useEffect(() => {
    scrollRef.current?.backTop();
  });

  let filteredItems = initDataList.map((item) => {
    let show = true;
    // 关键字搜索
    if (keyword) {
      // 去掉空格
      keyword = keyword.replace(/\s/g, '');
      if (
        !item.nameZh?.includes(keyword) &&
        !item.description?.includes(keyword) &&
        !item.descZh?.includes(keyword) &&
        !(item.id === keyword) &&
        !item.tags?.join('').includes(keyword) &&
        !item.descEn?.toLowerCase().includes(keyword.toLowerCase()) &&
        !item.nameEn?.toLowerCase().includes(keyword.toLowerCase())
      ) {
        show = false;
      }
    }
    return {
      ...item,
      show,
    };
  });

  // 当前展示的道具
  let showingItems = filteredItems.filter((item) => item.show);

  // 如果是药丸，则将药丸的 quality 排序，正面、负面、中性
  if (props.type === 'pill') {
    showingItems = showingItems.sort((a, b) => {
      const qualityMap = {
        正面: 1,
        中性: 2,
        负面: 3,
      };
      return qualityMap[a.quality ?? ''] - qualityMap[b.quality ?? ''];
    });
  }

  // 性能模式，走 VirtualList
  if (performance) {
    const list: ItemListVirtualListItem[] = showingItems.map((item) => ({
      type: 'item',
      item,
    }));
    list.push({
      type: 'component',
      component: <BottomTips count={list.length} themeColor={themeColor} />,
    });

    const itemRender = (rowData: ItemListVirtualListItem) => {
      if (rowData.type === 'component') {
        return <View>{rowData.component}</View>;
      }
      return (
        <ItemListCell
          item={rowData.item as Item}
          key={rowData.item?.id as string}
          themeColor={themeColor}
          type={props.type}
          lang={lang}
        />
      );
    };

    return (
      <View className={styles.listContainer}>
        <TopFilter type="item" />
        <VirtualList
          ref={scrollRef}
          itemHeight={48}
          data={list}
          renderRow={itemRender}
          loadHeight={1500}
          preloadHeight={375}
          height="calc(100vh - 208rpx)"
        />
      </View>
    );
  }

  return (
    <View style={{ paddingTop: '104rpx' }}>
      <TopFilter type="item" height="104rpx" />
      <View className={styles.list}>
        {showingItems.map((item) => (
          <ItemListCell
            item={item}
            key={item.id}
            themeColor={themeColor}
            type={props.type}
            lang={lang}
          />
        ))}
      </View>
      <BottomTips count={showingItems.length} themeColor={themeColor} />
    </View>
  );
};
