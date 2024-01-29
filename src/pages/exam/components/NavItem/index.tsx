import React from 'react';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import { useThemeInfo } from '@hooks/useThemeInfo';
import Taro from '@tarojs/taro';
import { ArrowSize6, Lock } from '@nutui/icons-react-taro';
import classNames from 'classnames';

interface Props {
  levelScore: number;
  iconSrc: string;
  title: string;
  desc: string;
  level: number;
  disabled: boolean;
  showBoxShadow: boolean;
}

export const NavItem: React.FC<Props> = (props) => {
  const { levelScore, level, title, desc, iconSrc, disabled, showBoxShadow } =
    props;
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const handleStartExam = () => {
    if (disabled) {
      Taro.showToast({
        title: '前置关卡大于60分解锁',
        icon: 'none',
      });
      return;
    }
    // 跳转到 paper 页面
    Taro.navigateTo({
      url: `/pages/paper/index?level=${level}`,
    });
  };

  let boxShadow = '';
  if (showBoxShadow) {
    boxShadow =
      themeColor.type === 'dark'
        ? '0 0 8px rgba(255, 255, 255, 0.3)'
        : '0 0 8px rgba(0, 0, 0, 0.2)';
  }

  return (
    <View
      className={classNames(styles.navItem, {
        [styles.disabled]: disabled,
      })}
      style={{ backgroundColor: themeColor.bgColor, boxShadow }}
      onClick={handleStartExam}
    >
      {disabled && (
        <Lock className={styles.lock} color={themeColor.textColor} size={20} />
      )}
      <View
        className={styles.left}
        style={{
          backgroundColor: themeColor.gridColor,
        }}
      >
        <Image className={styles.icon} src={iconSrc} />
      </View>
      <View className={styles.content}>
        <View className={styles.title}>
          <View className={styles.name}>{title}卷</View>
          <View className={styles.score}>
            记录：{levelScore ? levelScore : 0}分
          </View>
        </View>
        <View className={styles.desc}>{desc}</View>
      </View>
      <View className={styles.right}>
        <ArrowSize6 size={16} color="#c4b39d" />
      </View>
    </View>
  );
};
