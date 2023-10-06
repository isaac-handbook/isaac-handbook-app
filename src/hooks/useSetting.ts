import Taro from '@tarojs/taro';
import { useEffect } from 'react';
import { atom, selector, useRecoilState, useRecoilValueLoadable } from 'recoil';
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
  // 是否已从缓存中读取
  isLoaded: boolean;
  // 主图鉴的网格图标大小
  gridIconSize: GridIconSize;
  // 是否开启性能模式
  performance: boolean;
  // 排序方式
  sortMethod: (typeof sortMethodList)[number];
  // 主题色
  theme: (typeof themeList)[number]['value'];
  // 是否展示间隔线
  showGridBorder: boolean;
  // 开发者模式
  developerMode: boolean;
  isLoading: boolean;
}

export const defaultSettingInfo: SettingInfo = {
  isLoaded: false,
  gridIconSize: 'grid-normal',
  performance: true,
  sortMethod: 'ID',
  theme: 'dark',
  showGridBorder: true,
  developerMode: false,
  isLoading: false,
};

export const settingInfoState = atom<SettingInfo>({
  key: 'setting',
  default: defaultSettingInfo,
});

const settingInfoSelector = selector<SettingInfo>({
  key: 'settingInfoSelector',
  get: async () => {
    try {
      const storedSetting = await Taro.getStorage({ key: 'setting' });
      return {
        ...storedSetting.data,
        isLoaded: true,
      };
    } catch {
      return {
        ...defaultSettingInfo,
        isLoaded: true,
      };
    }
  },
});

export const useSetting = () => {
  const loadSetting = useRecoilValueLoadable(settingInfoSelector);

  const [setting, setSetting] = useRecoilState(settingInfoState);

  // 根据loadSetting的状态，更新或不更新atom
  useEffect(() => {
    if (setting.isLoaded) {
      return;
    }
    if (loadSetting.state === 'hasValue') {
      setSetting(loadSetting.contents);
    }
  }, [loadSetting]);

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
