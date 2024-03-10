import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { CharaInfo } from '../../../../types/handbook';
import { useHandBookData } from '@hooks/useHandbookData';
import { AchieveItem } from '@pages/achieves/components/AchieveItem';

interface Props {
  charaInfo: CharaInfo;
}

export const CharaAchieve: React.FC<Props> = (props) => {
  const { charaInfo } = props;
  const { nameZh } = charaInfo;

  const {
    handbookData: { achieves },
  } = useHandBookData();

  const matchText = `用{{chara|${nameZh}`;

  const matchedAchieve = achieves.filter((item) =>
    item.unlock?.includes(matchText),
  );

  if (!matchedAchieve.length) {
    return null;
  }

  return (
    <View className={styles.container}>
      <View className={styles['value-0']}>可解锁成就</View>
      {matchedAchieve.map((item) => (
        <AchieveItem achieve={item} />
      ))}
    </View>
  );
};
