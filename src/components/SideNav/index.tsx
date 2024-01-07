import React, { useState } from 'react';
import { Drag, FixedNav } from '@nutui/nutui-react-taro';
import charaImg from '@assets/chara.png';
import cardsImg from '@assets/cards.png';
import pillImg from '@assets/pill.png';
import coinImg from '@assets/coin.gif';
import othersImg from '@assets/others.png';
import Taro from '@tarojs/taro';

interface Props {}

export const SideNav: React.FC<Props> = () => {
  const list = [
    {
      id: 1,
      text: '饰品',
      icon: coinImg,
    },
    {
      id: 2,
      text: '卡牌',
      icon: cardsImg,
    },
    {
      id: 3,
      text: '胶囊',
      icon: pillImg,
    },
    {
      id: 4,
      text: '角色',
      icon: charaImg,
    },
    {
      id: 5,
      text: '其他',
      icon: othersImg,
    },
  ];

  const [visible, setVisible] = useState(false);

  const change = (value: boolean) => {
    setVisible(value);
  };

  const selected = (item: any) => {
    switch (item.id) {
      case 1:
        // 跳转到饰品页面
        Taro.navigateTo({
          url: `/pages/trinkets/index`,
        });
        setVisible(false);
        break;
      case 2:
        // 跳转到卡牌页面
        Taro.navigateTo({
          url: `/pages/cards/index`,
        });
        setVisible(false);
        break;
      case 3:
        // 跳转到胶囊页面
        Taro.navigateTo({
          url: `/pages/pills/index`,
        });
        setVisible(false);
        break;
      case 4:
        // 跳转到其他页面
        Taro.navigateTo({
          url: `/pages/charas/index`,
        });
        setVisible(false);
        break;
      case 5:
        // 跳转到其他页面
        Taro.navigateTo({
          url: `/pages/others/index`,
        });
        setVisible(false);
        break;
      default:
        break;
    }
  };

  return (
    <Drag
      direction="y"
      style={{ right: '0px', bottom: '240px', zIndex: '10!important' }}
    >
      <FixedNav
        list={list}
        inactiveText="更多"
        activeText="收起"
        visible={visible}
        onChange={change}
        onSelect={selected}
      />
    </Drag>
  );
};
