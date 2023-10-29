import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { CharaInfo } from '../../../../types/handbook';
import { DetailIcon } from './DetailIcon';
import { Unlock } from '@pages/item-detail/components/Unlock';
import { InfoRow } from './InfoRow';
import { lightThemeColor } from '@hooks/useThemeInfo/style';

interface Props {
  charaInfo: CharaInfo;
}

const renderInfoMap = {
  health: '生命',
  speed: '移速',
  tears: '射速',
  damage: '伤害',
  range: '射程',
  shotSpeed: '弹速',
  luck: '幸运',
};

export const SingleCharaBox: React.FC<Props> = (props) => {
  const { charaInfo } = props;
  const { nameZh } = charaInfo;

  return (
    <View
      className={styles.container}
      style={{
        backgroundColor: '#c4b39d',
        color: 'black',
      }}
    >
      <View className={styles.main}>
        <View className={styles.left}>
          <DetailIcon name={nameZh} />
          <View className={styles.name}>{nameZh}</View>
        </View>
        <View className={styles.right}>
          {Object.keys(renderInfoMap).map((infoName) => (
            <InfoRow
              key={infoName}
              label={renderInfoMap[infoName]}
              value={charaInfo[infoName]}
            />
          ))}
        </View>
      </View>
      <Unlock unlock={charaInfo.unlock} lockTheme={lightThemeColor} />
    </View>
  );
};
