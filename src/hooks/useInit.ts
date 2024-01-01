import { useRecoilState } from 'recoil';
import { useHandBookData } from './useHandbookData';
import { useAsyncEffect } from 'ahooks';
import { getHandBookData } from '@src/actions/getHandBookData';
import { getSettingData } from '@src/actions/getSettingData';
import { settingInfoState } from './useSetting';
import { checkAndUpdateApp } from '@src/actions/checkAndUpdateApp';
import { refreshHandBookData } from '@src/actions/refreshHandBookData';
import { useUI } from './useUI';

// 初始化，只在进入首页时执行一次
export const useInit = () => {
  const { setHandbookData } = useHandBookData();
  const [, setSettingData] = useRecoilState(settingInfoState);

  const { updateSingleUIState } = useUI();

  // 入口逻辑
  useAsyncEffect(async () => {
    // 获取设置数据并更新
    setSettingData(await getSettingData());

    // 读取app缓存，检查是否需要更新
    const checkRes = await checkAndUpdateApp();

    if (checkRes.forceRefreshNow && checkRes.shouldUpdate) {
      // 本地需要更新 且 需要强制刷新
      setHandbookData(await refreshHandBookData());
    } else {
      // 正常获取图鉴数据并更新
      setHandbookData(await getHandBookData());
    }

    if (checkRes.shouldUpdate) {
      // 本地需要更新，展示弹窗
      updateSingleUIState('showUpdateModal', true);
    }
  }, []);
};
