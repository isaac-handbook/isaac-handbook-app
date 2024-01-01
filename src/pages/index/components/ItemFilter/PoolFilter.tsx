import React, { memo } from 'react';
import { Image, ScrollView, View } from '@tarojs/components';
import styles from './index.module.scss';
import { useItemSearchInfo } from '@hooks/useItemSearchInfo';
import { useHandBookData } from '@hooks/useHandbookData';
import { Popup, SideNavBarItem } from '@nutui/nutui-react-taro';
import { StuffIcon } from '@components/StuffIcon';
import { stuffIconPositionMap } from '@constants';

// 一些特定的顺序
const order = [
  '恶魔房',
  '天使房',
  '宝箱房',
  '头目房',
  '商店',
  '诅咒房',
  '隐藏房',
  '图书馆',
  '挑战房',
  '星象房',
];

const Cell: React.FC = () => {
  const {
    itemSearchInfo: { poolFilter },
    setItemSearchInfo,
  } = useItemSearchInfo();

  const [visible, setVisible] = React.useState(false);

  const {
    handbookData: { items },
  } = useHandBookData();

  const onChange = (e: any) => {
    const cur = e.value;
    // console.log(e);
    setItemSearchInfo((prev) => ({
      ...prev,
      poolFilter: cur === '全部' ? '' : cur,
    }));
    setVisible(false);
  };

  // 找到items里所有的pools并去重 注意pools是数组
  const selectList = Array.from(
    new Set(
      items
        .map((item) => item.pools)
        .reduce((prev, cur) => {
          return prev.concat(cur);
        }, []),
    ),
  );

  // order中的排在最前面
  // “贪婪”开头的都排在order的内容的后面
  // 其他的按照原有顺序排列
  selectList.sort((a, b) => {
    const A = order.indexOf(a);
    const B = order.indexOf(b);
    if (A > -1 && B > -1) {
      if (A > B) {
        return 1;
      } else if (A < B) {
        return -1;
      } else {
        return 0;
      }
    } else if (A > -1) {
      return -1;
    } else if (B > -1) {
      return 1;
    } else if (a.startsWith('贪婪') && b.startsWith('贪婪')) {
      return 0;
    } else if (a.startsWith('贪婪')) {
      return 1;
    } else if (b.startsWith('贪婪')) {
      return -1;
    } else {
      return 0;
    }
  });

  selectList.unshift('全部');

  const renderIcon = (item: string, top = 6) => {
    if (item.includes('贪婪')) {
      return (
        <Image className={styles.mode} src={require(`@assets/mode/贪婪.png`)} />
      );
    }
    return (
      <StuffIcon
        location={stuffIconPositionMap[item]}
        top={6}
        scale={1.8}
        marginRight={12}
      />
    );
  };

  return (
    <>
      <View className={styles.item} onClick={() => setVisible(true)}>
        <View className={styles.label}>道具池</View>
        <View className={styles.value}>
          {renderIcon(poolFilter, 0)}
          {poolFilter || '全部'}
        </View>
      </View>
      <Popup
        visible={visible}
        style={{ width: '45%', height: '100%' }}
        position="right"
        onClose={() => {
          setVisible(false);
        }}
      >
        <ScrollView scrollY enablePassive className={styles.sideNavContent}>
          {selectList.map((item) => (
            <SideNavBarItem
              // @ts-ignore
              title={
                <View>
                  {renderIcon(item)}
                  {item}
                </View>
              }
              style={{ borderBottom: '1px solid #f5f5f5' }}
              value={item}
              onClick={onChange}
            />
          ))}
        </ScrollView>
      </Popup>
    </>
  );
};

export const PoolFilter = memo(Cell);
