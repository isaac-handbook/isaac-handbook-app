import React from 'react';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import paperImg from '@assets/paper.png';
import classNames from 'classnames';

interface Props {
  descZh?: React.ReactNode;
  nameZh?: React.ReactNode;
  type?: 'default' | 'oneRow';
  line1Style?: React.CSSProperties;
  line2Style?: React.CSSProperties;
}

export const PaperHeader: React.FC<Props> = (props) => {
  const { type = 'default', line1Style = {}, line2Style = {} } = props;
  const isOneRow = type === 'oneRow';
  return (
    <View className={classNames(styles.container, isOneRow && styles.oneRow)}>
      <Image
        src={paperImg}
        className={classNames(styles.bg, isOneRow && styles.oneRow)}
      />
      <View
        className={classNames(styles.line1, isOneRow && styles.oneRow)}
        style={{ ...line1Style }}
      >
        {isOneRow ? props.descZh : props.nameZh}
      </View>
      {!isOneRow && (
        <View className={styles.line2} style={{ ...line2Style }}>
          {props.descZh}
        </View>
      )}
    </View>
  );
};
