import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { SideNav } from '@components/SideNav';
import styles from './index.module.scss';
import { useHandBookData } from '@hooks/useHandbookData';
import { Item, ItemType } from 'src/types/handbook';
import Taro from '@tarojs/taro';
import { Unlock } from './components/Unlock';
import { DetailIcon } from './components/DetailIcon';
import ErrorBoundary from '@components/ErrorBoundary';
import { Header } from './components/Header';
import { DetailContent } from './components/DetailContent';
import { DetailTopNav } from '@components/DetailTopNav';
import { themeInfoState } from '@hooks/useThemeInfo';
import { useRecoilState } from 'recoil';
import LoadingPage from '@components/ErrorBoundary/LoadingPage';

function ItemDetail() {
  const { handbookData } = useHandBookData();
  const [{ themeColor }] = useRecoilState(themeInfoState);

  const [item, setItem] = React.useState<Item>();
  const [type, setType] = React.useState<ItemType>('item');

  // 获取页面参数中的 itemId
  useEffect(() => {
    const { itemId, type } = Taro.getCurrentInstance().router?.params as any;
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
  }, []);

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
        />

        <Header descZh={item.descZh} nameZh={item.nameZh} />

        <Unlock unlock={item.unlock} />

        <DetailContent item={item} handbookData={handbookData} type={type} />
      </View>
      <SideNav />
    </ErrorBoundary>
  );
}

export default ItemDetail;
