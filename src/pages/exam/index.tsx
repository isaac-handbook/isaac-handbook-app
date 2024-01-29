import { View, Image, Button } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import Taro, { useDidShow } from '@tarojs/taro';
import { useUser } from '@hooks/useUser';
import { useEffect } from 'react';
import { NavItem } from './components/NavItem';
import { ArrowSize6 } from '@nutui/icons-react-taro';
import { levelStringMap } from '@pages/paper/constant';
import emptyAvatar from '@assets/emptyAvatar.png';
import { userScoreToStageString } from './utils/userScoreToStageString';
import { defaultUserScoreMap, useExamPaper } from '@hooks/useExamPaper';
import { Ranking } from './components/Ranking';
import { useSetting } from '@hooks/useSetting';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const { user, setUser } = useUser();

  const {
    examPaper: { userScoreMap },
    updateSingleExamPaperState,
  } = useExamPaper();

  const {
    setting: { developerMode },
  } = useSetting();

  const userLogin = async () => {
    // 获取用户当前 openid
    const login = (await Taro.cloud.callFunction({
      name: 'login',
    })) as any;
    const OPENID = login?.result?.OPENID;
    if (!OPENID) {
      return;
    }
    // 获取用户头像、昵称
    const db = Taro.cloud.database();
    const col = db.collection('user');
    const res = await col.where({ _openid: OPENID }).get();
    const user = res.data[0];
    if (user) {
      setUser({
        avatar: user.avatar || '',
        nickname: user.nickname,
        openid: OPENID,
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
      openid: OPENID,
    });
  };

  // 获取到用户的 openid 之后，查询数据库，用户的得分
  useEffect(() => {
    updateUserScore();
  }, [user.openid]);

  useDidShow(async () => {
    Taro.showLoading({
      title: '',
    });
    await userLogin();
    await updateUserScore();
    Taro.hideLoading();
  });

  // 获取数据库里用户的得分
  const updateUserScore = async () => {
    if (!user.openid) {
      return;
    }
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
  };

  const handleUserEdit = async () => {
    Taro.navigateTo({
      url: `/pages/user-edit/index`,
    });
  };

  // 清空 score 集合中所有个人的数据
  const handleClearSelf = async () => {
    Taro.showLoading({
      title: '清理中',
    });
    const db = Taro.cloud.database();
    const col = db.collection('score');
    const res = await col.where({ _openid: user.openid }).get();
    const ids = res.data.map((item) => item._id);
    for (const id of ids) {
      await col.doc(id as any).remove({});
    }
    await updateUserScore();
    Taro.hideLoading();
  };

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.gridColor,
          color: themeColor.textColor,
        }}
      >
        <View className={styles.header} onClick={handleUserEdit}>
          <View className={styles.right}>
            <Image src={user.avatar || emptyAvatar} className={styles.avatar} />
          </View>
          <View className={styles.left}>
            <View className={styles.title}>{user.nickname}</View>
            <View className={styles.subtitle}>
              {user.avatar ? (
                '当前段位：' + userScoreToStageString(userScoreMap)
              ) : (
                <>
                  点击编辑名片
                  <ArrowSize6
                    className={styles.icon}
                    size={9}
                    color="#666666"
                  />
                </>
              )}
            </View>
          </View>
        </View>

        <NavItem
          level={1}
          title={levelStringMap['1']}
          disabled={false}
          showBoxShadow={userScoreMap.level1 < 60 && userScoreMap.level2 < 60}
          desc="20道题，证明你玩过以撒"
          levelScore={userScoreMap.level1}
          iconSrc={require('../../assets/chara/以撒.png')}
        />
        <NavItem
          level={2}
          title={levelStringMap['2']}
          disabled={userScoreMap.level1 < 60}
          showBoxShadow={userScoreMap.level1 >= 60 && userScoreMap.level2 < 60}
          desc="20道题，证明你有游戏理解"
          levelScore={userScoreMap.level2}
          iconSrc={require('../../assets/chara/堕化以撒.png')}
        />
        <NavItem
          level={3}
          title={levelStringMap['3']}
          disabled={userScoreMap.level2 < 60}
          showBoxShadow={userScoreMap.level2 >= 60 && userScoreMap.level3 < 60}
          desc="20道题，证明你是资深大佬"
          levelScore={userScoreMap.level3}
          iconSrc={require('../../assets/chara/游魂.png')}
        />
        <NavItem
          level={100}
          title={levelStringMap['100']}
          disabled={userScoreMap.level3 < 60}
          showBoxShadow={userScoreMap.level3 >= 60}
          desc="100道题，成为榜上的王者"
          levelScore={userScoreMap.level100}
          iconSrc={require('../../assets/chara/堕化游魂.png')}
        />

        <View className={styles.wangzheTitle}>
          王者排名
          <View className={styles.wangzheTip}>王者卷排名前100的玩家可上榜</View>
        </View>

        <Ranking />

        {developerMode && (
          <Button className={styles.clearBtn} onClick={handleClearSelf}>
            清空个人分数数据
          </Button>
        )}
      </View>
    </ErrorBoundary>
  );
}

export default Index;
