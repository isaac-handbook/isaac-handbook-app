import { atom, useRecoilState } from 'recoil';

interface CardSearchInfo {
  // 搜索关键字
  keyword: string;
  // 列表中展示中文还是英文
  lang: 'zh' | 'en';
}

export const defaultCardSearchInfo: CardSearchInfo = {
  keyword: '',
  lang: 'zh',
};

export const cardSearchInfoState = atom<CardSearchInfo>({
  key: 'cardSearchInfo',
  default: defaultCardSearchInfo,
});

export const useCardSearchInfo = () => {
  const [cardSearchInfo, setCardSearchInfo] =
    useRecoilState(cardSearchInfoState);

  const resetFilter = () => {
    setCardSearchInfo({
      ...defaultCardSearchInfo,
      keyword: cardSearchInfo.keyword,
    });
  };

  const updateCardSearchInfo = (newCardSearchInfo: Partial<CardSearchInfo>) => {
    setCardSearchInfo({
      ...cardSearchInfo,
      ...newCardSearchInfo,
    });
  };

  return {
    cardSearchInfo,
    setCardSearchInfo,
    resetFilter,
    updateCardSearchInfo,
  };
};
