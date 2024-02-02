import { atom, useRecoilState } from 'recoil';

export interface AppState {
  /** 图鉴主数据 handbook.json 的版本 */
  handbookJSONVersion: number | null;
  /** 问卷数据 question.json 的版本 */
  questionJSONVersion: number | null;
  /** 课堂页面的排名是否降级 */
  examRankingDegraded: boolean;
}

export const appState = atom<AppState>({
  key: 'appState',
  default: {
    handbookJSONVersion: null,
    questionJSONVersion: null,
    examRankingDegraded: false,
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
