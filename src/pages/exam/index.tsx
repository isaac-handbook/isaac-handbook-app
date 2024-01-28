import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import Taro, { useDidShow } from '@tarojs/taro';
import { useUser } from '@hooks/useUser';
import { useEffect, useState } from 'react';
import { NavItem } from './components/NavItem';
import { ArrowSize6 } from '@nutui/icons-react-taro';
import { levelStringMap } from '@pages/paper/constant';
import emptyAvatar from '@assets/emptyAvatar.png';

export type UserScore = {
  level1?: number;
  level2?: number;
  level3?: number;
  level100?: number;
};

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const { user, setUser } = useUser();

  const [userScore, setUserScore] = useState<UserScore>({
    level1: 0,
    level2: 0,
    level3: 0,
    level100: 0,
  });

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
        avatar: user.avatar || emptyAvatar,
        nickName: user.nickName,
        openid: OPENID,
      });
      return;
    }
    // 如果用户不存在，创建用户。默认给一个昵称
    const newUser = {
      nickName: '路人' + Math.floor(Math.random() * 10000),
    };
    await col.add({ data: newUser });
    setUser({
      avatar: emptyAvatar,
      nickName: newUser.nickName,
      openid: OPENID,
    });
  };

  // 获取到用户的 openid 之后，查询数据库，用户的得分
  useEffect(() => {
    updateUserScore();
  }, [user.openid]);

  useDidShow(() => {
    userLogin();
    updateUserScore();
  });

  const updateUserScore = async () => {
    if (!user.openid) {
      return;
    }
    const db = Taro.cloud.database();
    const col = db.collection('score');
    const res = await col.where({ _openid: user.openid }).get();
    const scoreMap: UserScore = {};
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
    setUserScore(scoreMap);
  };

  const handleUserEdit = async () => {
    Taro.navigateTo({
      url: `/pages/user-edit/index`,
    });
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
            <Image src={user.avatar} className={styles.avatar} />
          </View>
          <View className={styles.left}>
            <View className={styles.title}>{user.nickName}</View>
            <View className={styles.subtitle}>
              {user.avatar ? (
                '当前段位：青铜'
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
          desc="20道题，证明你玩过以撒"
          levelScore={userScore.level1}
          iconSrc={require('../../assets/chara/以撒.png')}
        />
        <NavItem
          level={2}
          title={levelStringMap['2']}
          desc="20道题，证明你有游戏理解"
          levelScore={userScore.level2}
          iconSrc={require('../../assets/chara/堕化以撒.png')}
        />
        <NavItem
          level={3}
          title={levelStringMap['3']}
          desc="20道题，证明你是资深大佬"
          levelScore={userScore.level3}
          iconSrc={require('../../assets/chara/游魂.png')}
        />

        <View className={styles.wangzheTitle}>王者榜单</View>
        <NavItem
          level={100}
          title={levelStringMap['100']}
          desc="100道题，让你榜上有名"
          levelScore={userScore.level100}
          iconSrc={require('../../assets/chara/堕化游魂.png')}
        />

        {/* <View>OPENID：{user.openid}</View> */}
      </View>
    </ErrorBoundary>
  );
}

export default Index;
