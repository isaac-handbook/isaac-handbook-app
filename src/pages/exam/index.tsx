import { View, Button } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import Taro, { useDidShow } from '@tarojs/taro';
import { useUser } from '@hooks/useUser';
import { useEffect } from 'react';
import { NavItem } from './components/NavItem';
import { levelStringMap, paperLevelMap } from '@pages/paper/constant';
import { defaultUserScoreMap, useExamPaper } from '@hooks/useExamPaper';
import { Ranking } from './components/Ranking';
import { useSetting } from '@hooks/useSetting';
import { useLockFn } from 'ahooks';
import { Header } from './components/Header';
import { useApp } from '@hooks/useApp';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const {
    app: { examConfig },
  } = useApp();

  const { user, setUser } = useUser();
  const { openid } = user;

  const {
    examPaper: { userScoreMap },
    updateSingleExamPaperState,
  } = useExamPaper();

  const {
    setting: { developerMode },
  } = useSetting();

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
    let scoreMap = { ...defaultUserScoreMap };
    for (const item of res.data) {
      if (item.level === 1 && item.score) {
        scoreMap.level1 = item.score;
      }
      if (item.level === 2 && item.score) {
        scoreMap.level2 = item.score;
      }
      if (item.level === 3 && item.score) {
        scoreMap.level3 = item.score;
      }
      if (item.level === 100 && item.score) {
        scoreMap.level100 = item.score;
      }
    }
    updateSingleExamPaperState('userScoreMap', scoreMap);
  });

  // 清空 score 集合中所有个人的数据
  const handleClearUser = async () => {
    Taro.showLoading({
      title: '清理中',
    });
    // 获取剪切板中的 openid
    const clipRes = await Taro.getClipboardData();
    const openid = clipRes.data;
    if (!openid || openid.length > 30) {
      Taro.showToast({
        title: '剪切板中没有 openid',
        icon: 'none',
      });
      return;
    }
    const db = Taro.cloud.database();
    const col = db.collection('score');
    const res = await col.where({ _openid: openid }).get();
    const ids = res.data.map((item) => item._id);
    for (const id of ids) {
      await col.doc(id as any).remove({});
    }
    Taro.hideLoading();
    Taro.showToast({
      title: '清理成功',
      icon: 'success',
    });
  };

  const getLevelDesc = (level: number) => {
    const configTip = examConfig[`level${level}Tip`];
    // 从 paperLevelMap 计算当前 level 有多少个题目
    const levelCount = paperLevelMap[String(level)].stageMap.reduce(
      (pre, cur) => {
        return pre + cur.count;
      },
      0,
    );
    return configTip.replace(/\{\{count\}\}/g, String(levelCount));
  };

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

        <NavItem
          level={1}
          title={levelStringMap['1']}
          disabled={false}
          showBoxShadow={userScoreMap.level1 < 60 && userScoreMap.level2 < 60}
          desc={getLevelDesc(1)}
          levelScore={userScoreMap.level1}
          iconSrc={require('../../assets/chara/以撒.png')}
        />
        <NavItem
          level={2}
          title={levelStringMap['2']}
          disabled={userScoreMap.level1 < 60}
          showBoxShadow={userScoreMap.level1 >= 60 && userScoreMap.level2 < 60}
          desc={getLevelDesc(2)}
          levelScore={userScoreMap.level2}
          iconSrc={require('../../assets/chara/堕化以撒.png')}
        />
        <NavItem
          level={3}
          title={levelStringMap['3']}
          disabled={userScoreMap.level2 < 60}
          showBoxShadow={userScoreMap.level2 >= 60 && userScoreMap.level3 < 60}
          desc={getLevelDesc(3)}
          levelScore={userScoreMap.level3}
          iconSrc={require('../../assets/chara/游魂.png')}
        />
        <NavItem
          level={100}
          title={levelStringMap['100']}
          disabled={userScoreMap.level3 < 60}
          showBoxShadow={userScoreMap.level3 >= 60}
          desc={getLevelDesc(100)}
          levelScore={userScoreMap.level100}
          iconSrc={require('../../assets/chara/堕化游魂.png')}
        />

        {(!examConfig.rankDegrade || developerMode) && <Ranking />}

        {developerMode && (
          <Button className={styles.clearBtn} onClick={handleClearUser}>
            清除剪切板中 openid 的数据
          </Button>
        )}
      </View>
    </ErrorBoundary>
  );
}

export default Index;
