// 计算字符串的中文字符长度。英文字母、数字、标点符号算半个
export function getStrLen(str: string) {
  return str.replace(/[^\x00-\xff]/g, 'aa').length / 2;
}
