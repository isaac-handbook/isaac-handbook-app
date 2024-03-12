import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import Taro, { useDidShow } from '@tarojs/taro';
import { useUser } from '@hooks/useUser';
import { useEffect, useState } from 'react';
import { defaultUserScoreMap, useExamPaper } from '@hooks/useExamPaper';
import { useLockFn } from 'ahooks';
import { Header } from './components/Header';
import { Empty, Tabs } from '@nutui/nutui-react-taro';
import { ExamContent } from './components/ExamContent';
import { examSeasonConfig } from '@src/config/config.app';
import _ from 'lodash';
import { useShareMenu } from '@utils/hooks/useShareMenu';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const { user, setUser } = useUser();
  const { openid } = user;

  const { updateSingleExamPaperState } = useExamPaper();

  const [seasonTab, setSeasonTab] = useState<any>('0');

  useShareMenu();

  const userInit = useLockFn(async () => {
    // 获取用户头像、昵称
    const db = Taro.cloud.database();
    const col = db.collection('user');
    const res = await col.where({ _openid: openid }).get();
    const user = res.data[0];
    if (user) {
      setUser({
        avatar: user.avatar || '',
        nickname: user.nickname,
        openid: openid,
      });
      return;
    }
    // 如果用户不存在，创建用户。默认给一个昵称
    const newUser = {
      nickname: '路人' + Math.floor(Math.random() * 10000),
    };
    await col.add({ data: newUser });
    setUser({
      avatar: '',
      nickname: newUser.nickname,
      openid: openid,
    });
  });

  // 获取到用户的 openid 之后，查询数据库，用户的得分
  useEffect(() => {
    if (!user.openid) {
      return;
    }
    pageResume();
  }, [user.openid]);

  useDidShow(() => {
    if (!user.openid) {
      return;
    }
    pageResume();
  });

  useEffect(() => {
    // 清除 TabBar 的红点
    Taro.hideTabBarRedDot({
      index: 1,
    });
  }, []);

  const pageResume = useLockFn(async () => {
    Taro.showLoading({
      title: '',
    });
    await Promise.all([userInit(), updateUserScore()]);
    Taro.hideLoading();
  });

  // 获取数据库里用户的得分
  const updateUserScore = useLockFn(async () => {
    const db = Taro.cloud.database();
    const col = db.collection('score');
    const res = await col.where({ _openid: user.openid }).get();
    let scoreMap = _.cloneDeep(defaultUserScoreMap);
    for (const item of res.data) {
      if (!item.score) {
        continue;
      }
      const seasonID = item.seasonID ? item.seasonID : 'item1';
      if (item.level === 1) {
        scoreMap[seasonID].level1 = item.score;
      }
      if (item.level === 2) {
        scoreMap[seasonID].level2 = item.score;
      }
      if (item.level === 3) {
        scoreMap[seasonID].level3 = item.score;
      }
      if (item.level === 100) {
        scoreMap[seasonID].level100 = item.score;
      }
    }
    updateSingleExamPaperState('userScoreMap', scoreMap);
  });

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
      >
        <Header />

        <Tabs
          value={seasonTab}
          onChange={(value) => {
            setSeasonTab(value);
          }}
          style={
            {
              '--nutui-tabs-titles-background-color': themeColor.bgColor,
              '--nutui-tabs-titles-item-color': themeColor.textColor,
              '--nutui-tabs-titles-item-active-color': themeColor.primaryColor,
              '--nutui-tabs-tab-line-color': themeColor.primaryColor,
              '--nutui-tabs-titles-font-size': '28rpx',
              '--nutui-tabs-tab-line-width': '64rpx',
              '--nutui-tabs-tab-line-height': '4rpx',
              '--nutui-tabs-line-border-radius': '4rpx',
            } as any
          }
        >
          {examSeasonConfig.seasonList.map((season) => {
            return (
              <Tabs.TabPane key={season.id} title={season.name}>
                {season.enable ? (
                  <ExamContent season={season} />
                ) : (
                  <Empty
                    title={
                      <View style={{ color: themeColor.textColor }}>
                        马上来啦
                      </View>
                    }
                    style={{
                      backgroundColor: 'transparent',
                    }}
                  />
                )}
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
