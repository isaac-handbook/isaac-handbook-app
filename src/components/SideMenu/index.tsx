import React, { useState } from 'react';
import { Popup } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { ScrollView, Image, View } from '@tarojs/components';
import styles from './index.module.scss';
import { Category, Home, Photograph } from '@nutui/icons-react-taro';
import { useThemeInfo } from '@hooks/useThemeInfo';
import classNames from 'classnames';

interface Props {}

export const SideMenu: React.FC<Props> = () => {
  const list = [
    {
      id: 'trinket',
      text: '饰品',
    },
    {
      id: 'card',
      text: '卡牌',
    },
    {
      id: 'pill',
      text: '胶囊',
    },
    {
      id: 'chara',
      text: '角色',
    },
    {
      id: 'suit',
      text: '套装',
    },
    {
      id: 'achieve',
      text: '成就',
    },
    {
      id: 'challenge',
      text: '挑战',
    },
    {
      id: 'curse',
      text: '诅咒',
    },
    {
      id: 'sacrifice-room',
      text: '献祭房',
      smallIcon: true,
    },
    {
      id: 'dice-room',
      text: '骰子房',
      smallIcon: true,
    },
    {
      id: 'boss-mark',
      text: '通关标记',
    },
    {
      id: 'scan',
      text: '道具识别',
      icon: <Photograph size={'34rpx'} />,
    },
  ];

  // 如果当前不处于首页，则给 list 添加 返回首页
  const currentPages = Taro.getCurrentPages();
  const currentPage = currentPages[currentPages.length - 1];

  if (currentPage.route !== 'pages/index/index') {
    list.push({
      id: 'backHome',
      text: '返回首页',
      icon: <Home size={'34rpx'} />,
    });
  }

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const [visible, setVisible] = useState(false);

  const selected = (item: any) => {
    switch (item.id) {
      case 'trinket':
        // 跳转到饰品页面
        Taro.navigateTo({
          url: `/pages/trinkets/index`,
        });
        setVisible(false);
        break;
      case 'card':
        // 跳转到卡牌页面
        Taro.navigateTo({
          url: `/pages/cards/index`,
        });
        setVisible(false);
        break;
      case 'pill':
        // 跳转到胶囊页面
        Taro.navigateTo({
          url: `/pages/pills/index`,
        });
        setVisible(false);
        break;
      case 'chara':
        // 跳转到其他页面
        Taro.navigateTo({
          url: `/pages/charas/index`,
        });
        setVisible(false);
        break;
      case 'scan':
        Taro.navigateTo({ url: '/package-scan/pages/scan/index' });
        break;
      case 'backHome':
        Taro.reLaunch({ url: '/pages/index/index' });
        break;
      case 'achieve':
        Taro.navigateTo({ url: '/pages/achieve/index' });
        break;
      case 'suit':
        Taro.navigateTo({ url: '/pages/suit/index' });
        break;
      case 'sacrifice-room':
        Taro.navigateTo({ url: '/pages/sacrifice-room/index' });
        break;
      case 'dice-room':
        Taro.navigateTo({ url: '/pages/dice-room/index' });
        break;
      case 'boss-mark':
        Taro.navigateTo({ url: '/pages/boss-mark/index' });
        break;
      case 'curse':
        Taro.navigateTo({ url: '/pages/curse/index' });
        break;
      case 'challenge':
        Taro.navigateTo({ url: '/pages/challenge/index' });
        break;
      default:
        break;
    }
  };

  const renderIcon = (icon: any, smallIcon = false) => {
    if (typeof icon === 'string') {
      return (
        <Image
          className={classNames(styles.icon, smallIcon && styles.smallIcon)}
          src={require(`@assets/sideMenu/${icon}.png`)}
          mode="heightFix"
        />
      );
    }
    return <View className={styles.icon}>{icon}</View>;
  };

  return (
    <>
      <View className={styles.gateIcon} onClick={() => setVisible(true)}>
        <Category size={'34rpx'} />
        <View className={styles.gateText}>菜单</View>
      </View>

      <Popup
        visible={visible}
        style={{
          width: '45%',
          height: '100%',
          color: themeColor.textColor,
          backgroundColor: themeColor.bgColor,
        }}
        position="right"
        onClose={() => {
          setVisible(false);
        }}
      >
        <ScrollView scrollY enablePassive className={styles.sideNavContent}>
          {list.map((item) => (
            <View
              className={styles.item}
              style={{ borderColor: themeColor.gridBorderColor + '80' }}
              onClick={() => selected(item)}
            >
              <View className={styles.iconContainer}>
                {renderIcon(item.icon ? item.icon : item.id, item.smallIcon)}
              </View>
              <View className={styles.text}>{item.text}</View>
            </View>
          ))}
        </ScrollView>
      </Popup>
    </>
  );
};
