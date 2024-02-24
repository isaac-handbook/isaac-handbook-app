import Taro from '@tarojs/taro';
import { atom, useRecoilState } from 'recoil';
import { GridIconSize } from '../components/ItemGrid/constants';

export const sortMethodList = ['ID', '颜色'] as const;

export const themeList = [
  {
    label: '深色系',
    value: 'dark',
  },
  {
    label: '浅色系',
    value: 'light',
  },
] as const;

export interface SettingInfo {
  /** 主图鉴的网格图标大小 */
  gridIconSize: GridIconSize;
  /** 是否开启性能模式 */
  performance: boolean;
  /** 排序方式 */
  sortMethod: (typeof sortMethodList)[number];
  /** 主题色 */
  theme: (typeof themeList)[number]['value'];
  /** 是否展示间隔线 */
  showGridBorder: boolean;
  /** 开发者模式 */
  developerMode: boolean;
  /** 【开发者】无尽模式试卷是否只生成自定义题目 */
  customOnlyOnEndlessPaper: boolean;
}

/** 默认设置 */
export const defaultSettingInfo: SettingInfo = {
  gridIconSize: 'grid-normal',
  performance: true,
  sortMethod: 'ID',
  theme: 'light',
  showGridBorder: true,
  developerMode: false,
  customOnlyOnEndlessPaper: false,
};

export const settingInfoState = atom<SettingInfo>({
  key: 'setting',
  default: defaultSettingInfo,
});

export const useSetting = () => {
  const [setting, setSetting] = useRecoilState(settingInfoState);

  const updateSetting = (newSetting: Partial<SettingInfo>) => {
    const mergedSetting = { ...setting, ...newSetting };
    setSetting(mergedSetting);
    Taro.setStorage({
      key: 'setting',
      data: mergedSetting,
    });
  };

  return {
    setting,
    updateSetting,
  };
};
