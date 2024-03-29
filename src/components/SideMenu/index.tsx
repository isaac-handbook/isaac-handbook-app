import React, { useEffect, useState } from 'react';
import { Badge, Popup } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { ScrollView, Image, View } from '@tarojs/components';
import styles from './index.module.scss';
import { Category, Home, Photograph } from '@nutui/icons-react-taro';
import { useThemeInfo } from '@hooks/useThemeInfo';
import classNames from 'classnames';
import { useApp } from '@hooks/useApp';
import { updateInfo } from '@src/config/config.app';
import { safeNavigate } from '@utils/navigate';

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
      id: 'achieves',
      text: '成就',
    },
    {
      id: 'challenges',
      text: '挑战',
    },
    {
      id: 'curses',
      text: '诅咒',
    },
    {
      id: 'seeds',
      text: '种子',
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

  const {
    app: { sideMenuBadge },
  } = useApp();

  const [visible, setVisible] = useState(false);

  const [badge, setBadge] = useState(false);

  // 检查是否要展示红点
  useEffect(() => {
    if (!sideMenuBadge) {
      return;
    }
    // 检查缓存
    const cache = Taro.getStorageSync('sideMenuBadge') || 0;
    if (typeof cache !== 'number') {
      return;
    }
    if (cache > 4) {
      return;
    }
    if (sideMenuBadge === updateInfo.version) {
      setBadge(true);
      // 存缓存
      Taro.setStorageSync('sideMenuBadge', cache + 1);
    }
  }, [sideMenuBadge]);

  const selected = (item: any) => {
    switch (item.id) {
      case 'trinket':
        // 跳转到饰品页面
        safeNavigate({
          url: `/pages/trinkets/index`,
        });
        setVisible(false);
        break;
      case 'card':
        // 跳转到卡牌页面
        safeNavigate({
          url: `/pages/cards/index`,
        });
        setVisible(false);
        break;
      case 'pill':
        // 跳转到胶囊页面
        safeNavigate({
          url: `/pages/pills/index`,
        });
        setVisible(false);
        break;
      case 'chara':
        // 跳转到其他页面
        safeNavigate({
          url: `/pages/charas/index`,
        });
        setVisible(false);
        break;
      case 'scan':
        safeNavigate({ url: '/package-scan/pages/scan/index' });
        break;
      case 'backHome':
        Taro.reLaunch({ url: '/pages/index/index' });
        break;
      case 'achieves':
        safeNavigate({ url: '/pages/achieves/index' });
        break;
      case 'suit':
        safeNavigate({ url: '/pages/suit/index' });
        break;
      case 'sacrifice-room':
        safeNavigate({ url: '/pages/sacrifice-room/index' });
        break;
      case 'dice-room':
        safeNavigate({ url: '/pages/dice-room/index' });
        break;
      case 'boss-mark':
        safeNavigate({ url: '/pages/boss-mark/index' });
        break;
      case 'curses':
        safeNavigate({ url: '/pages/curses/index' });
        break;
      case 'challenges':
        safeNavigate({ url: '/pages/challenges/index' });
        break;
      case 'seeds':
        safeNavigate({ url: '/pages/seeds/index' });
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
        {badge ? (
          <Badge value="NEW" top={-2} right={9} style={{ top: 3 }}>
            <Category size={'34rpx'} />
          </Badge>
        ) : (
          <Category
            size={'34rpx'}
            className="nut-icon-am-breathe  nut-icon-am-infinite"
          />
        )}

        <View
          className={styles.gateText}
          style={{ marginTop: badge ? '0rpx' : '8rpx' }}
        >
          菜单
        </View>
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
