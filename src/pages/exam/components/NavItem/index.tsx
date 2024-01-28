import React from 'react';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import { useThemeInfo } from '@hooks/useThemeInfo';
import Taro from '@tarojs/taro';
import { ArrowSize6 } from '@nutui/icons-react-taro';

interface Props {
  levelScore: number | undefined;
  iconSrc: string;
  title: string;
  desc: string;
  level: number;
}

export const NavItem: React.FC<Props> = (props) => {
  const { levelScore, level, title, desc, iconSrc } = props;
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const handleStartExam = () => {
    // 跳转到 paper 页面
    Taro.navigateTo({
      url: `/pages/paper/index?level=${level}`,
    });
  };

  return (
    <View
      className={styles.navItem}
      style={{ backgroundColor: themeColor.bgColor }}
      onClick={handleStartExam}
    >
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
          <View className={styles.name}>{title}</View>
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
