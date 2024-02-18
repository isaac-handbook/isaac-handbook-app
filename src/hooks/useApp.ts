import { atom, useRecoilState } from 'recoil';

export interface AppState {
  /** 图鉴主数据 handbook.json 的版本 */
  handbookJSONVersion: number | null;
  /** 问卷数据 question.json 的版本 */
  questionJSONVersion: number | null;
  /** 试卷页面的配置项 */
  examConfig: {
    /** exam 页面王者排名的提示 */
    rankTip: string;
    /** exam 页面无尽排名的提示 */
    endlessRankTip: string;
    /** 是否降级排行榜 */
    rankDegrade: boolean;
    level1Tip: string;
    level2Tip: string;
    level3Tip: string;
    level100Tip: string;
    /** 是否展示通关率 */
    showPassRate: boolean;
    /** 是否给课堂 Tab 展示红点，值为 app 版本 */
    tabBarBadge: string;
  };
  /** 各试卷的通关率 ，每1小时刷新 */
  examPassRate: Record<string, string>;
  /** 开发者模式 openid 白名单 */
  devWhiteList: string[];
}

export const defaultAppState: AppState = {
  handbookJSONVersion: null,
  questionJSONVersion: null,
  examConfig: {
    rankTip: '',
    endlessRankTip: '',
    rankDegrade: false,
    level1Tip: '试试身手',
    level2Tip: '更进一步',
    level3Tip: '小小挑战',
    level100Tip: '榜上有名',
    showPassRate: true,
    tabBarBadge: '',
  },
  examPassRate: {},
  devWhiteList: [],
};

export const appState = atom<AppState>({
  key: 'appState',
  default: defaultAppState,
});

export const useApp = () => {
  const [app, setApp] = useRecoilState(appState);

  const updateSingleAppState = <T extends keyof AppState>(
    key: T,
    value: AppState[T],
  ) => {
    setApp({
      ...app,
      [key]: value,
    });
  };

  return {
    app,
    updateSingleAppState,
    setApp,
  };
};
