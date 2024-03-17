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
import { AppState, defaultAppState, useApp } from './useApp';
import { refreshHandBookData } from '@src/actions/handbook/refreshHandBookData';
import { useEffect } from 'react';
import { updateInfo } from '@src/config/config.app';
import { useDev } from './useDev';

// 初始化，只在进入首页时执行一次
export const useHandbookInit = () => {
  const { handbookData, setHandbookData, updateSingleHandbookState } =
    useHandBookData();
  const [, setSettingData] = useRecoilState(settingInfoState);

  const { updateSingleUIState } = useUI();

  const { updateSingleUserState, userInfoInit } = useUser();

  const { app, setApp } = useApp();

  const { setDev } = useDev();

  useAsyncEffect(async () => {
    // 读取数据库的 app 集合，获取设置
    const db = Taro.cloud.database();
    const res = await db
      .collection('app')
      // ID 写死
      .doc('f531710465b7ae5000bfc8f91f80646a')
      .get({});
    const config = (res.data || defaultAppState) as AppState;
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
    userInfoInit(OPENID);
  }, []);

  // 是否要给课堂 Tab 展示红点
  useEffect(() => {
    if (!app.examConfig.tabBarBadge) {
      return;
    }
    // 检查缓存
    const cache = Taro.getStorageSync('examTabBarBadge');
    if (cache === app.examConfig.tabBarBadge) {
      return;
    }
    if (app.examConfig.tabBarBadge === updateInfo.version) {
      Taro.setTabBarBadge({
        index: 1,
        text: 'New',
      });
      // 存缓存
      Taro.setStorageSync('examTabBarBadge', updateInfo.version);
    }
  }, [app]);

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

    // 获取系统信息
    Taro.getSystemInfo().then((res) => {
      setDev((prev) => ({
        ...prev,
        systemInfo: res,
      }));
    });
  }, []);
};
