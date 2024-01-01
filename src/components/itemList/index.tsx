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
import { itemSearchInfoState } from '@hooks/useItemSearchInfo';
import { BottomTips } from '@components/BottomTips';

export interface ItemListProps {
  type: ItemType;
}

export const ItemList: React.FC<ItemListProps> = (props) => {
  const { handbookData } = useHandBookData();

  const [{ performance }] = useRecoilState(settingInfoState);

  const [{ themeColor }] = useRecoilState(themeInfoState);

  const [{ keyword: cardKeyword }] = useRecoilState(cardSearchInfoState);
  const [{ keyword: pillKeyword }] = useRecoilState(pillSearchInfoState);
  const [{ keyword: itemKeyword }] = useRecoilState(itemSearchInfoState);

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
  // 道具
  if (props.type === 'item') {
    keyword = itemKeyword;
    initDataList = handbookData.items;
  }

  const scrollRef = React.useRef<any>();

  useEffect(() => {
    scrollRef.current?.backTop();
  });

  let filteredItems = initDataList.map((item) => {
    let show = true;
    // 关键字搜索
    if (keyword) {
      if (
        !item.nameZh.includes(keyword) &&
        !item.description.includes(keyword) &&
        !item.descZh.includes(keyword) &&
        !(item.id === keyword) &&
        !item.tags.join('').includes(keyword) &&
        !item.descEn.toLowerCase().includes(keyword.toLowerCase()) &&
        !item.nameEn.toLowerCase().includes(keyword.toLowerCase())
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
  const showingItems = filteredItems.filter((item) => item.show);

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
        />
      );
    };

    return (
      <View className={styles.listContainer}>
        <VirtualList
          ref={scrollRef}
          itemHeight={48}
          data={list}
          renderRow={itemRender}
          loadHeight={1500}
          preloadHeight={375}
          paddingTop="53px"
        />
      </View>
    );
  }

  return (
    <View style={{ paddingTop: '53px' }}>
      <View className={styles.list}>
        {showingItems.map((item) => (
          <ItemListCell
            item={item}
            key={item.id}
            themeColor={themeColor}
            type={props.type}
          />
        ))}
      </View>
      <BottomTips count={showingItems.length} themeColor={themeColor} />
    </View>
  );
};
