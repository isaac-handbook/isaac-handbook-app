import { atom, useRecoilState } from 'recoil';
import { SettingInfo, useSetting } from '../useSetting';
import {
  ThemeColor,
  darkThemeColor,
  initThemeColor,
  lightThemeColor,
} from './style';
import { useEffect } from 'react';

interface ThemeInfo {
  // 当前的主题
  theme: SettingInfo['theme'] | 'init';
  // 当前主题内的颜色集合
  themeColor: ThemeColor;
}

export const themeInfoState = atom<ThemeInfo>({
  key: 'themeInfo',
  default: {
    theme: 'init',
    themeColor: initThemeColor,
  },
});

export const useThemeInfo = () => {
  const [themeInfo, setThemeInfo] = useRecoilState(themeInfoState);

  const {
    setting: { theme },
  } = useSetting();

  useEffect(() => {
    let themeColor: ThemeColor;
    switch (theme) {
      case 'dark':
        themeColor = darkThemeColor;
        break;
      case 'light':
        themeColor = lightThemeColor;
        break;
      default:
        themeColor = darkThemeColor;
        break;
    }
    setThemeInfo({
      theme,
      themeColor,
    });
  }, [theme]);

  return {
    themeInfo,
    setThemeInfo,
  };
};
