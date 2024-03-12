import React from 'react';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import { useThemeInfo } from '@hooks/useThemeInfo';
import Taro from '@tarojs/taro';
import { ArrowSize6, Lock } from '@nutui/icons-react-taro';
import classNames from 'classnames';
import { useExamPaper } from '@hooks/useExamPaper';
import { Season } from '@src/config/type';
import { safeNavigate } from '@utils/navigate';

interface Props {
  levelScore: number;
  iconSrc: string;
  title: string;
  desc: string;
  level: number;
  disabled: boolean;
  season: Season;
}

export const NavItem: React.FC<Props> = (props) => {
  const { levelScore, level, title, desc, iconSrc, disabled, season } = props;
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const { clearExamPaper } = useExamPaper();

  const handleStartExam = () => {
    if (disabled) {
      Taro.showToast({
        title: '前置关卡大于60分解锁',
        icon: 'none',
      });
      return;
    }
    clearExamPaper();
    setTimeout(() => {
      // 跳转到 paper 页面
      safeNavigate({
        url: `/pages/paper/index?level=${level}&seasonID=${season.id}`,
      });
    });
  };

  return (
    <View
      className={classNames(styles.navItem, {
        [styles.disabled]: disabled,
      })}
      style={{
        backgroundColor: themeColor.gridColor,
        color: themeColor.textColor,
      }}
      onClick={handleStartExam}
    >
      {disabled && (
        <Lock className={styles.lock} color={themeColor.textColor} size={19} />
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
        <ArrowSize6 size={14} color="#c4b39d" />
      </View>
    </View>
  );
};
