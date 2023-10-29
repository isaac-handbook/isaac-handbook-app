import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { handbookDataState } from '@hooks/useHandbookData';
import styles from './index.module.scss';
import { ItemGridCell } from './ItemGridCell';
import { settingInfoState } from '@hooks/useSetting';
import { gridSizeMap } from './constants';
import { itemSearchInfoState } from '@hooks/useItemSearchInfo';
import { Item, ItemGridVirtualListItem, ItemType } from 'src/types/handbook';
import VirtualList from '@components/VirtualList';
import { sortItemIdByColor } from './constants';
import { themeInfoState } from '@hooks/useThemeInfo';
import { trinketSearchInfoState } from '@hooks/useTrinketSearchInfo';
import { useRecoilState } from 'recoil';
import { BottomTips } from '@components/BottomTips';

export interface ItemGridProps {
  type: ItemType;
}

export const ItemGrid: React.FC<ItemGridProps> = (props) => {
  const [handbookData] = useRecoilState(handbookDataState);

  const [{ gridIconSize, performance, sortMethod, showGridBorder }] =
    useRecoilState(settingInfoState);

  const [{ themeColor }] = useRecoilState(themeInfoState);

  const [
    {
      keyword: itemKeyword,
      poolFilter,
      tagFilter,
      qualityFilter,
      chargeFilter,
      unlockFilter,
    },
  ] = useRecoilState(itemSearchInfoState);

  const [{ keyword: trinketKeyword }] = useRecoilState(trinketSearchInfoState);

  let keyword: string = '';
  let initDataList: Item[] = [];
  // 饰品
  if (props.type === 'trinket') {
    keyword = trinketKeyword;
    initDataList = handbookData.trinkets;
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
        !item.tags.includes(keyword) &&
        !item.descEn.toLowerCase().includes(keyword.toLowerCase()) &&
        !item.nameEn.toLowerCase().includes(keyword.toLowerCase())
      ) {
        show = false;
      }
    }
    // 如果当前是饰品，直接返回
    if (props.type === 'trinket') {
      return {
        ...item,
        show,
      };
    }

    // 道具相关过滤

    // 道具池过滤
    if (poolFilter) {
      if (!item.pools.includes(poolFilter)) {
        show = false;
      }
    }
    // 标签过滤
    if (tagFilter) {
      if (!item.tags.includes(tagFilter)) {
        show = false;
      }
    }
    // 道具品质过滤
    if (qualityFilter) {
      if (item.quality !== qualityFilter) {
        show = false;
      }
    }
    // 充能类过滤
    // 时间充能类
    if (chargeFilter === '时间充能' && !item.charge.includes('秒')) {
      show = false;
    }
    // 电池充能类
    if (
      chargeFilter === '电池充能' &&
      !/^\d+$|^\d+,一次性使用$/.test(item.charge)
    ) {
      show = false;
    }
    // 无充能类
    if (chargeFilter === '无充能' && item.charge !== '/') {
      show = false;
    }

    // 是否需要解锁
    if (unlockFilter) {
      if (unlockFilter === '需要解锁' && !item.unlock) {
        show = false;
      }
      if (unlockFilter === '不需要解锁' && item.unlock) {
        show = false;
      }
    }
    return {
      ...item,
      show,
    };
  });

  if (sortMethod === '颜色' && props.type === 'item') {
    // 通过 sortItemIdByColor 排序
    // @ts-ignore
    filteredItems = sortItemIdByColor
      .map((id) => filteredItems.find((item) => item.id === id))
      .filter((item) => item?.id);
  }

  // 一行几个格子
  const columnCount = gridSizeMap[gridIconSize].columnCount;

  // 当前展示的道具
  const showingItems = filteredItems.filter((item) => item.show);

  // 当前展示的道具的数量
  const showingItemCount = showingItems.length;

  // 补全到能整除columnCount
  showingItems.push(
    ...new Array(columnCount - (showingItems.length % columnCount)).fill({
      show: true,
    }),
  );

  // 补全后的格子数量
  const showingCellCount = showingItems.length;

  // 性能模式，走 VirtualList
  if (performance) {
    // 包装成一行columnCount个格子的二维数组
    const list: ItemGridVirtualListItem[] = new Array(
      Math.ceil(showingCellCount / columnCount),
    )
      .fill(0)
      .map((_, index) => {
        const curItems = showingItems.slice(
          index * columnCount,
          (index + 1) * columnCount,
        );
        return {
          type: 'items',
          items: curItems,
        };
      });
    list.push({
      type: 'component',
      component: (
        <BottomTips count={showingItemCount} themeColor={themeColor} />
      ),
    });

    const itemRender = (
      rowData: ItemGridVirtualListItem,
      dataIndex: number,
    ) => {
      if (rowData.type === 'component') {
        return <View className={styles.row}>{rowData.component}</View>;
      }
      return (
        <View className={styles.row} key={dataIndex}>
          {rowData.items?.map((item) => (
            <ItemGridCell
              item={item}
              size={gridIconSize}
              key={item.id}
              themeColor={themeColor}
              showGridBorder={showGridBorder}
              type={props.type}
            />
          ))}
        </View>
      );
    };

    return (
      <View
        className={styles.listContainer}
        style={{
          borderColor: showGridBorder
            ? themeColor.gridBorderColor
            : 'transparent',
        }}
      >
        <VirtualList
          ref={scrollRef}
          itemHeight={375 / columnCount}
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
      <View
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
          borderColor: showGridBorder
            ? themeColor.gridBorderColor
            : 'transparent',
        }}
      >
        {showingItems.map((item) => (
          <ItemGridCell
            item={item}
            size={gridIconSize}
            key={item.id}
            themeColor={themeColor}
            showGridBorder={showGridBorder}
            type={props.type}
          />
        ))}
      </View>
      <BottomTips count={showingCellCount} themeColor={themeColor} />
    </View>
  );
};
