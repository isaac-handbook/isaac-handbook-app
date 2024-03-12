import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useHandBookData } from '@hooks/useHandbookData';
import { Item, ItemType } from 'src/types/handbook';
import Taro, { useShareAppMessage } from '@tarojs/taro';
import { Unlock } from './components/Unlock';
import { DetailIcon } from './components/DetailIcon';
import ErrorBoundary from '@components/ErrorBoundary';
import { DetailContent } from './components/DetailContent';
import { DetailTopNav } from '@components/DetailTopNav';
import { themeInfoState } from '@hooks/useThemeInfo';
import { useRecoilState } from 'recoil';
import LoadingPage from '@components/ErrorBoundary/LoadingPage';
import { CharaFigure } from './components/CharaFigure';
import { PaperHeader } from './components/PaperHeader';
import { useShareMenu } from '@utils/hooks/useShareMenu';

function ItemDetail() {
  const { handbookData } = useHandBookData();
  const [{ themeColor }] = useRecoilState(themeInfoState);

  const params = Taro.getCurrentInstance().router?.params as any;
  const [itemId, setItemId] = React.useState<string>(params.itemId);
  const [type, setType] = React.useState<ItemType>(params.type);
  const [item, setItem] = React.useState<Item>();

  useShareMenu();
  useShareAppMessage(() => {
    return {
      title: `道具 - ${item?.nameZh}`,
      path: `/pages/item-detail/index?type=${type}&itemId=${itemId}`,
    };
  });

  // 广告加载失败，隐藏组件
  // const [adError, setAdError] = React.useState(false);

  // 获取页面参数中的 itemId
  useEffect(() => {
    // 道具
    if (type === 'item') {
      const item = handbookData.items.find((item) => item.id === itemId);
      setItem(item);
      setType('item');
    }
    // 饰品
    if (type === 'trinket') {
      const trinket = handbookData.trinkets.find(
        (trinket) => trinket.id === itemId,
      );
      setItem(trinket);
      setType('trinket');
    }
    // 卡牌
    if (type === 'card') {
      const card = handbookData.cards.find((card) => card.id === itemId);
      setItem(card);
      setType('card');
    }
    // 胶囊
    if (type === 'pill') {
      const pill = handbookData.pills.find((pill) => pill.id === itemId);
      setItem(pill);
      setType('pill');
    }
  }, [type, itemId]);

  const getNextItem = () => {
    if (type === 'item') {
      const index = handbookData.items.findIndex((i) => i.id === item?.id);
      return handbookData.items[index + 1];
    }
    if (type === 'trinket') {
      const index = handbookData.trinkets.findIndex((i) => i.id === item?.id);
      return handbookData.trinkets[index + 1];
    }
  };

  // 道具翻前一页
  const goToNextItem = () => {
    if (type === 'item') {
      const nextItem = getNextItem();
      if (nextItem) {
        setItemId(nextItem.id);
      }
    }
    if (type === 'trinket') {
      const nextItem = getNextItem();
      if (nextItem) {
        setItemId(nextItem.id);
      }
    }
  };

  const getPrevItem = () => {
    if (type === 'item') {
      const index = handbookData.items.findIndex((i) => i.id === item?.id);
      return handbookData.items[index - 1];
    }
    if (type === 'trinket') {
      const index = handbookData.trinkets.findIndex((i) => i.id === item?.id);
      return handbookData.trinkets[index - 1];
    }
  };

  // 道具翻后一页
  const goToPrevItem = () => {
    if (type === 'item') {
      const prevItem = getPrevItem();
      if (prevItem) {
        setItemId(prevItem.id);
      }
    }
    if (type === 'trinket') {
      const prevItem = getPrevItem();
      if (prevItem) {
        setItemId(prevItem.id);
      }
    }
  };

  if (!item) {
    return <LoadingPage />;
  }

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
      >
        <DetailTopNav item={item} />

        <DetailIcon
          id={item.id}
          iconPosition={item.iconPosition}
          type={type}
          charge={item.charge}
          getNextItem={getNextItem}
          goToNextItem={goToNextItem}
          getPrevItem={getPrevItem}
          goToPrevItem={goToPrevItem}
        />

        <PaperHeader descZh={item.descZh} nameZh={item.nameZh} />

        <Unlock unlock={item.unlock} />

        <DetailContent item={item} />

        <CharaFigure itemId={item.id} />

        {/* {
          // 广告
          !adError && (
            <Ad
              style={{
                marginTop: '0rpx',
                marginBottom: '32rpx',
              }}
              unitId="adunit-77323283421750ec"
              onLoad={() => {
                console.log('道具详情页Banner广告加载成功');
              }}
              onError={(err) => {
                console.log('道具详情页Banner广告加载失败', err);
                setAdError(true);
              }}
            />
          )
        } */}
      </View>
    </ErrorBoundary>
  );
}

export default ItemDetail;
