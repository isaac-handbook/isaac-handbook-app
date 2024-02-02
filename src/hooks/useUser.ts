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

  return {
    user,
    updateSingleUserState,
    setUser,
  };
};
