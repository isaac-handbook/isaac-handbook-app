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
}

// 初始化主题
export const initThemeColor: ThemeColor = {
  type: 'light',
  bgColor: 'transparent',
  gridColor: 'transparent',
  gridBorderColor: 'transparent',
  textColor: '#000000',
};

// 深色系主题
export const darkThemeColor: ThemeColor = {
  type: 'dark',
  bgColor: '#2c2925',
  gridColor: '#353535',
  gridBorderColor: '#000000',
  textColor: '#FFFFFFD9',
};

// 浅色系主题
export const lightThemeColor: ThemeColor = {
  type: 'light',
  bgColor: '#FFEFD5',
  gridColor: '#FDF5E6',
  gridBorderColor: '#bbbbbb',
  textColor: '#000000E0',
};
