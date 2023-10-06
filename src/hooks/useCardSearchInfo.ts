import { atom, useRecoilState } from 'recoil';

interface CardSearchInfo {
  // 搜索关键字
  keyword: string;
}

export const defaultCardSearchInfo: CardSearchInfo = {
  keyword: '',
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
      keyword: cardSearchInfo.keyword,
    });
  };

  return {
    cardSearchInfo,
    setCardSearchInfo,
    resetFilter,
  };
};
