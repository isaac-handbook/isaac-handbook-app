import React, { memo } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useItemSearchInfo } from '@hooks/useItemSearchInfo';
import { useHandBookData } from '@hooks/useHandbookData';
import { SideNavBar, SideNavBarItem } from '@nutui/nutui-react-taro';

// 一些特定的顺序
const order = [
  '猫套装',
  '宝宝套装',
  '针套装',
  '恶魔套装',
  '天使套装',
  '苍蝇套装',
  '书套装',
  '蘑菇套装',
  '妈妈套装',
  '大便套装',
  '蜘蛛套装',
  '鲍勃套装',
  '乞丐套装',
];

// 将某些名称转换为更友好的名称
export const convertTagToSuit = {
  嗝屁猫: '猫套装',
  宝宝: '宝宝套装',
  注射器: '针套装',
  恶魔: '恶魔套装',
  天使: '天使套装',
  苍蝇: '苍蝇套装',
  书: '书套装',
  蘑菇: '蘑菇套装',
  妈妈: '妈妈套装',
  大便: '大便套装',
  蜘蛛: '蜘蛛套装',
  鲍勃: '鲍勃套装',
  乞丐: '乞丐套装',
};
const convertName = (name: string) => {
  return convertTagToSuit[name] || name;
};

const reConvertName = (name: string) => {
  return (
    Object.keys(convertTagToSuit).find(
      (key) => convertTagToSuit[key] === name,
    ) || name
  );
};

const Cell: React.FC = () => {
  const {
    itemSearchInfo: { tagFilter },
    setItemSearchInfo,
  } = useItemSearchInfo();

  const {
    handbookData: { items },
  } = useHandBookData();

  const [visible, setVisible] = React.useState(false);

  const onChange = (e: any) => {
    const cur = e.value;
    setItemSearchInfo((prev) => ({
      ...prev,
      tagFilter: cur === '全部' ? '' : reConvertName(cur),
    }));
    setVisible(false);
  };

  // 找到items里所有的pools并去重 注意pools是数组
  const selectList = Array.from(
    new Set(
      items
        .map((item) => item.tags)
        .reduce((prev, cur) => {
          return prev.concat(cur);
        }, []),
    ),
  );

  // 名称转换
  selectList.forEach((item, index) => {
    selectList[index] = convertName(item);
  });

  // 排序
  selectList.sort((a, b) => {
    const aIndex = order.indexOf(a);
    const bIndex = order.indexOf(b);
    if (aIndex === -1 && bIndex === -1) {
      return a.localeCompare(b);
    }
    if (aIndex === -1) {
      return 1;
    }
    if (bIndex === -1) {
      return -1;
    }
    return aIndex - bIndex;
  });

  selectList.unshift('全部');

  const showLabel = convertName(tagFilter || '全部');

  return (
    <>
      <View className={styles.item} onClick={() => setVisible(true)}>
        <View className={styles.label}>套装、标签</View>
        <View className={styles.value}>{showLabel}</View>
      </View>
      <SideNavBar
        visible={visible}
        onClose={() => setVisible(false)}
        position="right"
        width="45%"
        title="选择道具池"
      >
        {selectList.map((item) => (
          <SideNavBarItem title={item} value={item} onClick={onChange} />
        ))}
      </SideNavBar>
    </>
  );
};

export const TagFilter = memo(Cell);
