export const formatCharaName = (name?: string) => {
  if (!name) return '';
  return name.replace('???', '？？？');
};

export const unFormatCharaName = (name?: string) => {
  if (!name) return '';
  return name.replace('？？？', '???');
};
