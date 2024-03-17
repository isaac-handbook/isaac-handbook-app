import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Drag } from '@nutui/nutui-react-taro';
import { Filter } from '@nutui/icons-react-taro';
import { Item } from '@typers/handbook';
import { safeNavigate } from '@utils/navigate';

interface Props {
  item: Item;
}

export const CommentBubble: React.FC<Props> = (props) => {
  const { item } = props;

  const handleClick = () => {
    // 跳转到评论页面
    safeNavigate({
      url: `/pages/comment/index?itemId=${item.id}&type=${item.type}`,
    });
  };

  return (
    <Drag
      direction="y"
      style={{ right: '0px', bottom: '480rpx', zIndex: '1!important' }}
    >
      <View className={styles.gateBtn} onClick={handleClick}>
        <Filter color="#111" size={'28rpx'} />
        <View className={styles.gateText}>评论</View>
      </View>
    </Drag>
  );
};
