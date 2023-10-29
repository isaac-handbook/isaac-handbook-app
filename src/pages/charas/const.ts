export const normalCharaList = [
  '以撒',
  '抹大拉',
  '该隐',
  '犹大',
  '???',
  '夏娃',
  '参孙',
  '阿撒泻勒',
  '拉撒路',
  '伊甸',
  '游魂',
  '莉莉丝',
  '店主',
  '亚玻伦',
  '遗骸',
  '伯大尼',
  '雅各和以扫',
] as const;

export type NormalCharaList = (typeof normalCharaList)[number];

export const badCharaList = [
  '堕化以撒',
  '堕化抹大拉',
  '堕化该隐',
  '堕化犹大',
  '堕化???',
  '堕化夏娃',
  '堕化参孙',
  '堕化阿撒泻勒',
  '堕化拉撒路',
  '堕化伊甸',
  '堕化游魂',
  '堕化莉莉丝',
  '堕化店主',
  '堕化亚玻伦',
  '堕化遗骸',
  '堕化伯大尼',
  '堕化雅各',
] as const;

export type BadCharaList = (typeof badCharaList)[number];
