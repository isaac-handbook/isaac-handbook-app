import { HandBookData, ItemType } from '@typers/handbook';

interface Params {
  target: string;
  handbookData: HandBookData;
  type?: ItemType;
}

// 从 handbookData 中获取对应的数据
export const pickItemFromHandbook = (params: Params) => {
  const { target, handbookData, type = 'item' } = params;
  // 如果是ID=c开头，说明要匹配道具的id
  if (target.startsWith('ID=c')) {
    const item = handbookData.items.find(
      (item) => item.id === target.replace('ID=c', ''),
    );
    if (!item) {
      return null;
    }
    return item;
  }
  // 如果是ID=t开头，说明要匹配饰品的id
  if (target.startsWith('ID=t')) {
    const trinket = handbookData.trinkets.find(
      (trinket) => trinket.id === target.replace('ID=t', ''),
    );
    if (!trinket) {
      return null;
    }
    return trinket;
  }
  // 如果是ID=p开头，说明要匹配胶囊的id
  if (target.startsWith('ID=p')) {
    const pill = handbookData.pills.find(
      (pill) => pill.id === target.replace('ID=p', ''),
    );
    if (!pill) {
      return null;
    }
    return pill;
  }
  // 如果是ID=k开头，说明要匹配卡牌的id
  if (target.startsWith('ID=k')) {
    const card = handbookData.cards.find(
      (card) => card.id === target.replace('ID=k', ''),
    );
    if (!card) {
      return null;
    }
    return card;
  }
  // 不是c开头，匹配nameZh
  // 匹配道具
  const item = handbookData.items.find((item) => item.nameZh === target);
  if (item) return item;
  // 匹配饰品
  const trinket = handbookData.trinkets.find(
    (trinket) => trinket.nameZh === target,
  );
  if (trinket) return trinket;
  // 匹配卡牌
  const card = handbookData.cards.find((card) => card.nameZh === target);
  if (card) return card;
  // 匹配胶囊
  const pill = handbookData.pills.find((pill) => pill.nameZh === target);
  if (pill) return pill;

  if (type === 'chara') {
    return handbookData.chara[target];
  }

  return null;
};
