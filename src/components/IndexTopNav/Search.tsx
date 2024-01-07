import React from 'react';
import { View } from '@tarojs/components';
import { useItemSearchInfo } from '@hooks/useItemSearchInfo';
import { SearchBar } from '@nutui/nutui-react-taro';
import styles from './index.module.scss';
import { useSetting } from '@hooks/useSetting';
import Taro from '@tarojs/taro';
import { useTrinketSearchInfo } from '@hooks/useTrinketSearchInfo';
import { useCardSearchInfo } from '@hooks/useCardSearchInfo';
import { usePillSearchInfo } from '@hooks/usePillSearchInfo';
import { ItemType } from 'src/types/handbook';

export interface SearchProps {
  type: ItemType;
  marginLeft?: string;
}

export const Search: React.FC<SearchProps> = (props) => {
  const { itemSearchInfo, setItemSearchInfo } = useItemSearchInfo();
  const { trinketSearchInfo, setTrinketSearchInfo } = useTrinketSearchInfo();
  const { cardSearchInfo, setCardSearchInfo } = useCardSearchInfo();
  const { pillSearchInfo, setPillSearchInfo } = usePillSearchInfo();
  const { updateSetting } = useSetting();

  const onSearch = (val: string) => {
    // 开发者模式密码
    if (val === 'p697') {
      updateSetting({
        developerMode: true,
      });
      Taro.showToast({
        title: '已进入开发者模式',
        icon: 'none',
      });
      return;
    }
    if (val === 'closep697') {
      updateSetting({
        developerMode: false,
      });
      Taro.showToast({
        title: '已退出开发者模式',
        icon: 'none',
      });
      return;
    }
    // 搜索道具
    if (props.type === 'item') {
      setItemSearchInfo((prev) => ({
        ...prev,
        keyword: val,
      }));
      return;
    }
    // 搜索饰品
    if (props.type === 'trinket') {
      setTrinketSearchInfo((prev) => ({
        ...prev,
        keyword: val,
      }));
    }
    // 搜索卡牌
    if (props.type === 'card') {
      setCardSearchInfo((prev) => ({
        ...prev,
        keyword: val,
      }));
    }
    // 搜索胶囊
    if (props.type === 'pill') {
      setPillSearchInfo((prev) => ({
        ...prev,
        keyword: val,
      }));
    }
  };

  const handleClear = () => {
    if (props.type === 'item') {
      setItemSearchInfo((prev) => ({
        ...prev,
        keyword: '',
      }));
      return;
    }
    if (props.type === 'trinket') {
      setTrinketSearchInfo((prev) => ({
        ...prev,
        keyword: '',
      }));
    }
    if (props.type === 'card') {
      setCardSearchInfo((prev) => ({
        ...prev,
        keyword: '',
      }));
    }
    if (props.type === 'pill') {
      setPillSearchInfo((prev) => ({
        ...prev,
        keyword: '',
      }));
    }
  };

  const customStyle: any = {
    '--nutui-searchbar-padding': '0',
    '--nutui-searchbar-input-height': '38px',
    '--nutui-searchbar-input-border-radius': '19px',
  };

  let keyword = '';
  switch (props.type) {
    case 'item':
      keyword = itemSearchInfo.keyword;
      break;
    case 'trinket':
      keyword = trinketSearchInfo.keyword;
      break;
    case 'card':
      keyword = cardSearchInfo.keyword;
      break;
    case 'pill':
      keyword = pillSearchInfo.keyword;
      break;
    default:
      break;
  }

  return (
    <View className={styles.search} style={{ marginLeft: props.marginLeft }}>
      <SearchBar
        shape="round"
        placeholder={'万能的搜索'}
        onSearch={onSearch}
        style={customStyle}
        onClear={handleClear}
        className="my-search-bar"
        value={keyword}
      />
    </View>
  );
};
