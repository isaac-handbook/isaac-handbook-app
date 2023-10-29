import React from 'react';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import { formatCharaName } from '@utils/formatCharaName';

interface Props {
  name: string;
}

export const DetailIcon: React.FC<Props> = ({ name }) => {
  return (
    <View>
      <Image
        className={styles.charaImg}
        mode="heightFix"
        src={require(`@assets/chara/body/${formatCharaName(name)}.png`)}
      />
    </View>
  );
};
