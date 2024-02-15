import { CSSProperties } from 'react';

type Color = CSSProperties['backgroundColor'];

export interface ThemeColor {
  // 颜色类型
  type: 'dark' | 'light';
  // 背景颜色
  bgColor: Color;
  // 格子颜色
  gridColor: Color;
  // 间隔线颜色
  gridBorderColor: Color;
  // 文字颜色
  textColor: Color;
  // link 颜色
  linkColor: Color;
  // 重点颜色
  primaryColor: Color;
  // 错误颜色
  errorColor: Color;
  // 成功颜色
  successColor: Color;
}

const baseColor: Pick<
  ThemeColor,
  'linkColor' | 'primaryColor' | 'errorColor' | 'successColor'
> = {
  linkColor: '#739ede',
  // primaryColor: '#f7b733',
  primaryColor: '#FF8C00',
  errorColor: '#ff4d4f',
  successColor: '#52c41a',
};

// 初始化主题
export const initThemeColor: ThemeColor = {
  type: 'light',
  bgColor: 'transparent',
  gridColor: 'transparent',
  gridBorderColor: 'transparent',
  textColor: '#000000',
  ...baseColor,
};

// 深色系主题
export const darkThemeColor: ThemeColor = {
  type: 'dark',
  bgColor: '#2c2925',
  gridColor: '#353535',
  gridBorderColor: '#000000',
  textColor: '#FFFFFFD9',
  ...baseColor,
};

// 浅色系主题
export const lightThemeColor: ThemeColor = {
  type: 'light',
  // bgColor: '#FFEFD5',
  bgColor: '#F5E5CD',
  // bgColor: '	#FFE4B5',
  gridColor: '#FDF5E6',
  gridBorderColor: '#bbbbbb',
  textColor: '#000000E0',
  ...baseColor,
};
