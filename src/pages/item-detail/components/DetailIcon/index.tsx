import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { ItemIcon } from '@components/ItemIcon';
import { Item, ItemType } from 'src/types/handbook';
import { ChargeBar } from '@components/ChargeBar';
import { ArrowLeft, ArrowRight } from '@nutui/icons-react-taro';
import { useThemeInfo } from '@hooks/useThemeInfo';

interface Props {
  id: string;
  iconPosition: string;
  type: ItemType;
  charge?: string;
  getNextItem: () => Item | undefined;
  goToNextItem: () => void;
  getPrevItem: () => Item | undefined;
  goToPrevItem: () => void;
}

export const DetailIcon: React.FC<Props> = (props) => {
  const { getNextItem, goToNextItem, getPrevItem, goToPrevItem } = props;

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  return (
    <View className={styles.container}>
      {getPrevItem() && (
        <View onClick={goToPrevItem} className={styles.turnPrev}>
          <ArrowLeft size={24} color={themeColor.textColor} />
        </View>
      )}

      <ItemIcon
        id={props.id}
        location={props.iconPosition}
        size="grid-large"
        type={props.type}
        scaleRate={1.5}
      />
      {props.charge && (
        <View className={styles.charge}>
          <ChargeBar charge={props.charge} scale={2} />
        </View>
      )}

      {getNextItem() && (
        <View onClick={goToNextItem} className={styles.turnNext}>
          <ArrowRight size={24} color={themeColor.textColor} />
        </View>
      )}
    </View>
  );
};
