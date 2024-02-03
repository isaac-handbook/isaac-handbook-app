import { useRecoilState } from 'recoil';
import { useAsyncEffect, useDeepCompareEffect } from 'ahooks';
import { getSettingData } from '@src/actions/getSettingData';
import { settingInfoState } from './useSetting';
import { checkAndUpdateApp } from '@src/actions/checkAndUpdateApp';
import { useUI } from './useUI';
import Taro from '@tarojs/taro';
import { useUser } from './useUser';
import { AppState, useApp } from './useApp';
import { useEffect } from 'react';
import { useExamPaper } from './useExamPaper';
import { refreshExamData } from '@src/actions/exam/refreshExamData';
import { getExamData } from '@src/actions/exam/getExamData';

// 初始化试卷数据，只在进入首页时执行一次
export const useExamInit = () => {
  const {
    examPaper: { examRawData },
    updateSingleExamPaperState,
    updateSingleExamRawData,
  } = useExamPaper();
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
    if (!examRawData?.item?.length) {
      return;
    }
    const questionJSONVersion = Number(app.questionJSONVersion);
    if (!questionJSONVersion) {
      return;
    }
    console.log('---------------');
    console.log('缓存 examRawData 版本', examRawData?.version);
    console.log('配置 examRawData 版本', questionJSONVersion);
    console.log('---------------');
    // 检查 examJSON 是否需要更新
    if (!examRawData.version || questionJSONVersion > examRawData.version) {
      console.log('检测到试卷数据需要更新，正在更新');
      updateSingleExamRawData('version', questionJSONVersion);
      refreshExamData().then((res) => {
        updateSingleExamPaperState('examRawData', {
          ...res,
          version: questionJSONVersion,
        });
      });
    } else {
      console.log('试卷数据无需更新');
    }
  }, [examRawData, app]);

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
  useEffect(() => {
    // 获取设置数据并更新
    getSettingData().then((res) => {
      setSettingData(res);
    });

    // 正常获取图鉴数据并更新
    getExamData().then((res) => {
      updateSingleExamPaperState('examRawData', res);
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