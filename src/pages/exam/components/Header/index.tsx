import React from 'react';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import { ArrowSize6 } from '@nutui/icons-react-taro';
import { userScoreToStageString } from '@pages/exam/utils/userScoreToStageString';
import { useExamPaper } from '@hooks/useExamPaper';
import emptyAvatar from '@assets/emptyAvatar.png';
import { useUser } from '@hooks/useUser';
import { Help } from '../Help';
import { safeNavigate } from '@utils/navigate';

interface Props {}

export const Header: React.FC<Props> = () => {
  const {
    examPaper: { userScoreMap },
  } = useExamPaper();

  const { user } = useUser();

  const handleUserEdit = async () => {
    safeNavigate({
      url: `/pages/user-edit/index`,
    });
  };

  return (
    <View className={styles.header}>
      <View className={styles.left} onClick={handleUserEdit}>
        <Image src={user.avatar || emptyAvatar} className={styles.avatar} />
      </View>
      <View className={styles.content} onClick={handleUserEdit}>
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
      <View className={styles.right}>
        <Help />
      </View>
    </View>
  );
};
