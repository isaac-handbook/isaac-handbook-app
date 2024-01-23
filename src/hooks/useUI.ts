import { atom, useRecoilState } from 'recoil';

interface UI {
  // 是否展示更新弹窗
  showUpdateModal: boolean;
}

export const uiState = atom<UI>({
  key: 'uiState',
  default: {
    showUpdateModal: false,
  },
});

export const useUI = () => {
  const [ui, setUI] = useRecoilState(uiState);

  const updateSingleUIState = <T extends keyof UI>(key: T, value: UI[T]) => {
    setUI({
      ...ui,
      [key]: value,
    });
  };

  return {
    ui,
    updateSingleUIState,
  };
};
