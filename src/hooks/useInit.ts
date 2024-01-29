import { useRecoilState } from 'recoil';
import { useHandBookData } from './useHandbookData';
import { useAsyncEffect } from 'ahooks';
import { getHandBookData } from '@src/actions/getHandBookData';
import { getSettingData } from '@src/actions/getSettingData';
import { settingInfoState } from './useSetting';
import { checkAndUpdateApp } from '@src/actions/checkAndUpdateApp';
import { useUI } from './useUI';
// import Taro from '@tarojs/taro';
// import { AppDBConfig } from '@typers/app';
// import { refreshHandBookData } from '@src/actions/refreshHandBookData';

// 初始化，只在进入首页时执行一次
export const useInit = () => {
  const { handbookData, setHandbookData } = useHandBookData();
  const [, setSettingData] = useRecoilState(settingInfoState);

  const { updateSingleUIState } = useUI();

  // useAsyncEffect(async () => {
  //   if (!handbookData.items.length) {
  //     return;
  //   }
  //   // 读取数据库的 app 集合，获取设置
  //   const db = Taro.cloud.database();
  //   const res = await db.collection('app').get();
  //   const config = res.data[0] as AppDBConfig;
  //   if (!handbookData?.version) {

  //   }
  //   if (config.handbookJSONVersion !== handbookData.version) {
  //     // 本地图鉴版本与数据库不一致，需要更新
  //     setHandbookData(await refreshHandBookData());
  //   }
  // }, [handbookData]);

  // 入口逻辑
  useAsyncEffect(async () => {
    // 获取设置数据并更新
    setSettingData(await getSettingData());

    // 读取app缓存，检查是否需要更新
    const checkRes = await checkAndUpdateApp();

    // 正常获取图鉴数据并更新
    setHandbookData(await getHandBookData());

    if (checkRes.shouldUpdate) {
      // 本地需要更新，展示弹窗
      updateSingleUIState('showUpdateModal', true);
    }
  }, []);
};
