import { useRecoilState } from 'recoil';
import { useHandBookData } from './useHandbookData';
import { useAsyncEffect, useDeepCompareEffect } from 'ahooks';
import { getHandBookData } from '@src/actions/handbook/getHandBookData';
import { getSettingData } from '@src/actions/getSettingData';
import { settingInfoState } from './useSetting';
import { checkAndUpdateApp } from '@src/actions/checkAndUpdateApp';
import { useUI } from './useUI';
import Taro from '@tarojs/taro';
import { useUser } from './useUser';
import { AppState, useApp } from './useApp';
import { refreshHandBookData } from '@src/actions/handbook/refreshHandBookData';

// 初始化，只在进入首页时执行一次
export const useHandbookInit = () => {
  const { handbookData, setHandbookData, updateSingleHandbookState } =
    useHandBookData();
  const [, setSettingData] = useRecoilState(settingInfoState);

  const { updateSingleUIState } = useUI();

  const { updateSingleUserState } = useUser();

  const { app, setApp } = useApp();

  useAsyncEffect(async () => {
    // 读取数据库的 app 集合，获取设置
    const db = Taro.cloud.database();
    const res = await db.collection('app').get();
    const config = res.data[0] as AppState;
    setApp(config);
  }, []);

  useDeepCompareEffect(() => {
    if (!handbookData?.items?.length) {
      return;
    }
    const handbookJSONVersion = Number(app.handbookJSONVersion);
    if (!handbookJSONVersion) {
      return;
    }
    console.log('---------------');
    console.log('缓存 handbookData 版本', handbookData?.version);
    console.log('配置 handbookData 版本', handbookJSONVersion);
    console.log('---------------');
    // 检查 handbookJSON 是否需要更新
    if (!handbookData?.version || handbookJSONVersion > handbookData.version) {
      console.log('检测到图鉴数据需要更新，正在更新');
      updateSingleHandbookState('version', handbookJSONVersion);
      refreshHandBookData().then((res) => {
        setHandbookData({
          ...res,
          version: handbookJSONVersion,
        });
      });
    } else {
      console.log('图鉴数据无需更新');
    }
  }, [handbookData, app]);

  useAsyncEffect(async () => {
    // 获取用户当前 openid
    const login = (await Taro.cloud.callFunction({
      name: 'login',
    })) as any;
    const OPENID = login?.result?.OPENID;
    if (!OPENID) {
      return;
    }
    updateSingleUserState('openid', OPENID);
  }, []);

  // 入口逻辑
  useAsyncEffect(async () => {
    // 获取设置数据并更新
    await getSettingData().then((res) => {
      setSettingData(res);
    });

    // 正常获取图鉴数据并更新
    getHandBookData().then((res) => {
      setHandbookData(res);
    });

    // 读取app缓存，检查是否需要更新
    checkAndUpdateApp().then((res) => {
      if (res.shouldUpdate) {
        // 本地需要更新，展示弹窗
        updateSingleUIState('showUpdateModal', true);
      }
    });
  }, []);
};
