import React from 'react';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import Taro from '@tarojs/taro';
import { ArrowSize6 } from '@nutui/icons-react-taro';
import { userScoreToStageString } from '@pages/exam/utils/userScoreToStageString';
import { useExamPaper } from '@hooks/useExamPaper';
import emptyAvatar from '@assets/emptyAvatar.png';
import { useUser } from '@hooks/useUser';

interface Props {}

export const Header: React.FC<Props> = () => {
  const {
    examPaper: { userScoreMap },
  } = useExamPaper();

  const { user } = useUser();

  const handleUserEdit = async () => {
    Taro.navigateTo({
      url: `/pages/user-edit/index`,
    });
  };

  return (
    <View className={styles.header} onClick={handleUserEdit}>
      <View className={styles.right}>
        <Image src={user.avatar || emptyAvatar} className={styles.avatar} />
      </View>
      <View className={styles.left}>
        <View className={styles.title}>{user.nickname}</View>
        <View className={styles.subtitle}>
          {user.avatar ? (
            '当前段位：' + userScoreToStageString(userScoreMap)
          ) : (
            <>
              点击编辑名片
              <ArrowSize6 className={styles.icon} size={9} color="#666666" />
            </>
          )}
        </View>
      </View>
    </View>
  );
};
