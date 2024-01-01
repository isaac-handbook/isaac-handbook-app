import React from 'react';
import { Image, ScrollView, View } from '@tarojs/components';
import styles from './index.module.scss';
import { Popup } from '@nutui/nutui-react-taro';
import { useRecoilState } from 'recoil';
import { settingInfoState } from '@hooks/useSetting';
import { gridSizeMap } from '@components/ItemGrid/constants';
import { ItemGridCell } from '@components/ItemGrid/ItemGridCell';
import { themeInfoState } from '@hooks/useThemeInfo';
import { handbookDataState } from '@hooks/useHandbookData';
import { ContentTransformer } from '@components/ContentTransformer';
import classNames from 'classnames';
import { Dot } from '@components/Dot';
import { drawerMaskColor } from '@src/styles';
import { convertTagToSuit } from '@pages/index/components/ItemFilter/TagFilter';

interface Props {
  children: React.ReactNode;
  poolFilter?: string;
  tagFilter?: string;
  qualityFilter?: string;
  title: string;
  itemInfoList?: string[];
  className?: string;
  type?: 'default' | 'suit';
}

export const ItemGridDrawer: React.FC<Props> = (props) => {
  const {
    poolFilter,
    tagFilter,
    qualityFilter,
    title,
    itemInfoList = [],
    type = 'default',
  } = props;

  const isSuit = type === 'suit';

  const [showDrawer, setShowDrawer] = React.useState(false);

  const [handbookData] = useRecoilState(handbookDataState);
  const [{ themeColor }] = useRecoilState(themeInfoState);
  const [{ gridIconSize, showGridBorder }] = useRecoilState(settingInfoState);
  // 一行几个格子
  const columnCount = gridSizeMap[gridIconSize].columnCount;

  // 格式化 itemInfoList
  let formatedItemInfoList: string[] = [];
  if (itemInfoList.length) {
    const isId = itemInfoList[0].startsWith('ID=');
    formatedItemInfoList = itemInfoList
      .map((item) => {
        if (isId) {
          return item.replace('ID=', '').replace('c', '');
        }
        // 不是ID列表，说明是道具名称列表，转换成道具ID
        const targetItem = handbookData.items.find(
          (itemData) => itemData.nameZh === item,
        );
        return targetItem?.id ?? '';
      })
      .filter((item) => item);
  }

  let filteredItems = handbookData.items.map((item) => {
    let show = true;
    // 关键字搜索
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
    // itemInfoList 过滤
    if (formatedItemInfoList.length) {
      if (!formatedItemInfoList.includes(item.id)) {
        show = false;
      }
    }
    return {
      ...item,
      show,
    };
  });

  const showingItems = filteredItems.filter((item) => item.show);

  const renderHeader = () => {
    if (!tagFilter || !handbookData.extra.tagInfo[tagFilter]) {
      return null;
    }
    // 套装
    if (isSuit) {
      return (
        <View className={styles.header}>
          <View className={styles.suit}>
            <View className={styles.info}>
              {handbookData.extra.tagInfo[tagFilter].map((info) => (
                <View className={styles.line}>
                  <Dot level={1} themeColor={themeColor} />
                  <ContentTransformer value={info} lineHeight="52rpx" />
                </View>
              ))}
            </View>
            <View className={styles.imgBox}>
              <Image
                className={styles.img}
                mode="heightFix"
                src={require(`@assets/suit/${convertTagToSuit[tagFilter]}.png`)}
              />
            </View>
          </View>
        </View>
      );
    }
    // 普通标签
    return (
      <View className={styles.header}>
        {handbookData.extra.tagInfo[tagFilter].map((info) => (
          <View className={styles.line}>
            <Dot level={1} themeColor={themeColor} />
            <ContentTransformer value={info} lineHeight="52rpx" />
          </View>
        ))}
      </View>
    );
  };

  // 补全到能整除columnCount
  showingItems.push(
    ...new Array(columnCount - (showingItems.length % columnCount)).fill({
      show: true,
    }),
  );

  return (
    <>
      <View
        className={classNames(styles.children, props.className)}
        onClick={() => setShowDrawer(true)}
      >
        {props.children}
      </View>
      <Popup
        title={title}
        visible={showDrawer}
        position="bottom"
        round
        onClose={() => {
          setShowDrawer(false);
        }}
        closeable
        overlay={true}
        overlayStyle={{ backgroundColor: drawerMaskColor }}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
        lockScroll
        destroyOnClose
      >
        {renderHeader()}
        <ScrollView
          className={styles.drawer}
          style={{
            backgroundColor: themeColor.bgColor,
            height: isSuit ? '50vh' : '60vh',
          }}
          scrollY
          enablePassive
        >
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
                type={'item'}
              />
            ))}
          </View>
        </ScrollView>
      </Popup>
    </>
  );
};
