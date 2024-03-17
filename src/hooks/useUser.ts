import Taro from '@tarojs/taro';
import { useLockFn } from 'ahooks';
import { atom, useRecoilState } from 'recoil';

interface User {
  /** 用户的 openid */
  openid: string;
  /** 用户的昵称 */
  nickname: string;
  /** 用户的头像 */
  avatar: string;
}

export const userState = atom<User>({
  key: 'userState',
  default: {
    openid: '',
    nickname: '',
    avatar: '',
  },
});

export const useUser = () => {
  const [user, setUser] = useRecoilState(userState);

  const updateSingleUserState = <T extends keyof User>(
    key: T,
    value: User[T],
  ) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const userInfoInit = useLockFn(async (userOpenid: string) => {
    // 获取用户头像、昵称
    const db = Taro.cloud.database();
    const col = db.collection('user');
    const res = await col.where({ _openid: userOpenid }).get();
    const user_ = res.data[0];
    if (user_) {
      setUser({
        avatar: user_.avatar || '',
        nickname: user_.nickname,
        openid: userOpenid,
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
      openid: userOpenid,
    });
  });

  return {
    user,
    updateSingleUserState,
    setUser,
    userInfoInit,
  };
};
