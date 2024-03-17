import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useHandBookData } from '@hooks/useHandbookData';
import { Item } from 'src/types/handbook';
import Taro, { useShareAppMessage } from '@tarojs/taro';
import { RateHeader } from './components/RateHeader';
import ErrorBoundary from '@components/ErrorBoundary';
import { themeInfoState } from '@hooks/useThemeInfo';
import { useRecoilState } from 'recoil';
import LoadingPage from '@components/ErrorBoundary/LoadingPage';
import { useShareMenu } from '@utils/hooks/useShareMenu';
import { InputComment } from './components/InputComment';
import { CommentList } from './components/CommentList';

function ItemDetail() {
  const { handbookData } = useHandBookData();
  const [{ themeColor }] = useRecoilState(themeInfoState);

  const params = Taro.getCurrentInstance().router?.params as any;
  const [item, setItem] = React.useState<Item>();

  const itemId = params.itemId;
  const type = params.type;

  useShareMenu();
  useShareAppMessage(() => {
    return {
      title: `评论区 - ${item?.nameZh}`,
      path: `/pages/item-detail/index?type=${type}&itemId=${itemId}`,
    };
  });

  // 获取页面参数中的 itemId
  useEffect(() => {
    // 道具
    if (type === 'item') {
      const item = handbookData.items.find((item) => item.id === itemId);
      setItem(item);
    }
    // 饰品
    if (type === 'trinket') {
      const trinket = handbookData.trinkets.find(
        (trinket) => trinket.id === itemId,
      );
      setItem(trinket);
    }
    // 卡牌
    if (type === 'card') {
      const card = handbookData.cards.find((card) => card.id === itemId);
      setItem(card);
    }
    // 胶囊
    if (type === 'pill') {
      const pill = handbookData.pills.find((pill) => pill.id === itemId);
      setItem(pill);
    }
  }, [type, itemId]);

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
        <CommentList
          itemId={itemId}
          type={type}
          header={
            <RateHeader
              itemId={itemId}
              iconPosition={item.iconPosition}
              type={type}
              charge={item.charge}
            />
          }
        />

        <InputComment itemId={itemId} type={type} />
      </View>
    </ErrorBoundary>
  );
}

export default ItemDetail;
