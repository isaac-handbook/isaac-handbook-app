import React from 'react';
import { ScrollView, View } from '@tarojs/components';
import styles from './index.module.scss';
import { Popup } from '@nutui/nutui-react-taro';
import { useRecoilState } from 'recoil';
import { themeInfoState } from '@hooks/useThemeInfo';
import { handbookDataState } from '@hooks/useHandbookData';
import classNames from 'classnames';
import { UnlockItemCell } from './UnlockItemCell';
import { drawerMaskColor } from '@src/styles';

interface Props {
  children: React.ReactNode;
  nameZh: string;
  title: string;
  className?: string;
}

export const CharaUnlockDrawer: React.FC<Props> = (props) => {
  const { nameZh, title } = props;

  const [showDrawer, setShowDrawer] = React.useState(false);

  const [handbookData] = useRecoilState(handbookDataState);
  const [{ themeColor }] = useRecoilState(themeInfoState);

  const matchName = `chara|${nameZh}`;

  // 从 handbookData 中获取当前角色可以解锁的物品
  const showingItems = handbookData.items.filter((item) =>
    item.unlock.includes(matchName),
  );

  const showingTrinkets = handbookData.trinkets.filter((trinket) =>
    trinket.unlock.includes(matchName),
  );

  const showingCards = handbookData.cards.filter((card) =>
    card.unlock.includes(matchName),
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
        <ScrollView
          className={styles.drawer}
          style={{
            backgroundColor: themeColor.bgColor,
            height: '65vh',
          }}
          scrollY
          enablePassive
        >
          {showingItems.map((item) => (
            <UnlockItemCell
              item={item}
              key={item.id}
              themeColor={themeColor}
              type={'item'}
              nameZh={nameZh}
            />
          ))}
          {showingTrinkets.map((item) => (
            <UnlockItemCell
              item={item}
              key={item.id}
              themeColor={themeColor}
              type={'trinket'}
              nameZh={nameZh}
            />
          ))}
          {showingCards.map((item) => (
            <UnlockItemCell
              item={item}
              key={item.id}
              themeColor={themeColor}
              type={'card'}
              nameZh={nameZh}
            />
          ))}
        </ScrollView>
      </Popup>
    </>
  );
};
