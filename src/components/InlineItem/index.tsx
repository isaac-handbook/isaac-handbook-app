import React from 'react';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import { ItemIcon } from '@components/ItemIcon';
import { Item } from 'src/types/handbook';
import { useRecoilState } from 'recoil';
import { themeInfoState } from '@hooks/useThemeInfo';
import { formatCharaName, unFormatCharaName } from '@utils/formatCharaName';
import { safeNavigate } from '@utils/navigate';

interface Props {
  item: Item | null;
  // 是否可跳转
  linkable?: boolean;
}

export const InlineItem: React.FC<Props> = ({ item, linkable = true }) => {
  const [{ themeColor }] = useRecoilState(themeInfoState);
  if (!item) {
    return null;
  }

  const type = item.type;
  const isChara = type === 'chara';

  const color = linkable ? themeColor.linkColor : themeColor.textColor;

  const handleClick = () => {
    if (!linkable) {
      return;
    }
    if (isChara) {
      safeNavigate({
        url: `/pages/chara-detail/index?charaName=${formatCharaName(
          item.nameZh,
        )}`,
      });
    }
    // 跳转到对应的物品详情页
    safeNavigate({
      url: `/pages/item-detail/index?itemId=${item.id}&type=${type}`,
    });
  };

  const renderIcon = () => {
    if (isChara) {
      return (
        <Image
          className={styles.charaIcon}
          src={require(`@assets/chara/${formatCharaName(item.nameZh)}.png`)}
        />
      );
    }
    return (
      <ItemIcon
        id={item.id}
        location={item.iconPosition}
        size="inline"
        type={type}
        absolute
      />
    );
  };

  const renderName = () => {
    if (isChara) {
      return unFormatCharaName(item.nameZh).replace(/\|/g, ' ');
    }
    return item.nameZh;
  };

  return (
    <View className={styles.container} onClick={handleClick}>
      {renderIcon()}
      <View className={styles.name} style={{ color }}>
        {renderName()}
      </View>
    </View>
  );
};
