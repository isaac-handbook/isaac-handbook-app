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
    /** 是否降级排行榜 */
    rankDegrade: boolean;
    level1Tip: string;
    level2Tip: string;
    level3Tip: string;
    level100Tip: string;
  };
  /** 开发者模式 openid 白名单 */
  devWhiteList: string[];
}

export const appState = atom<AppState>({
  key: 'appState',
  default: {
    handbookJSONVersion: null,
    questionJSONVersion: null,
    examConfig: {
      rankTip: '',
      rankDegrade: false,
      level1Tip: '',
      level2Tip: '',
      level3Tip: '',
      level100Tip: '',
    },
    devWhiteList: [],
  },
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
