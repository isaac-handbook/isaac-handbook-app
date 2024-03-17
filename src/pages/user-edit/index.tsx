import { Button, Image, Input, View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { useUser } from '@hooks/useUser';
import { ArrowSize6 } from '@nutui/icons-react-taro';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import emptyAvatar from '@assets/emptyAvatar.png';
import { CustomButton } from '@components/CustomButton';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const {
    user: { avatar, nickname, openid },
    setUser,
  } = useUser();

  const [inputNickName, setInputNickName] = useState<string>(nickname);
  const [inputAvatar, setInputAvatar] = useState<string>(avatar || emptyAvatar);
  const [uploadedAvatar, setUploadedAvatar] = useState<string>();

  useEffect(() => {
    if (nickname) {
      setInputNickName(nickname);
    }
    if (avatar) {
      setInputAvatar(avatar);
    }
  }, [avatar, nickname]);

  const handleChooseAvatar = (e) => {
    const tmpUrl = e.detail?.avatarUrl;
    if (!tmpUrl) {
      Taro.showToast({
        title: '获取头像失败',
        icon: 'none',
      });
      return;
    }
    // 获取当前时间戳
    const timestamp = new Date().getTime();
    // 上传到对象存储 user-avatar 目录下
    const cloudPath = `user-avatar/${openid}-${timestamp}.png`;
    Taro.cloud.uploadFile({
      cloudPath,
      filePath: tmpUrl,
      success: (res) => {
        setInputAvatar(tmpUrl);
        setUploadedAvatar(res.fileID);
      },
      fail: () => {
        Taro.showToast({
          title: '上传头像失败',
          icon: 'none',
        });
      },
    });
  };

  // 更新个人信息后，需要同步更新 score 表中所有该用户的记录
  const updateAllScoreData = async () => {
    const db = Taro.cloud.database();
    const col = db.collection('score');
    await col
      .where({
        _openid: openid,
      })
      // @ts-ignore
      .update({
        data: {
          avatar: uploadedAvatar,
          nickname: inputNickName,
        },
      });
  };

  const handleSubmit = async () => {
    Taro.showLoading({
      title: '更新中...',
    });
    // 更新数据库，user 集合
    const db = Taro.cloud.database();
    const col = db.collection('user');
    // 如果数据库中没有当前用户的记录，就插入一条新的记录。
    // 如果有，就更新记录。
    const queryRes = col.where({
      _openid: openid,
    });
    const dbUser = (await queryRes.get()).data[0];
    // 更新记录。此时一定有记录，否则报错
    await col.doc(dbUser._id as any).update({
      data: {
        avatar: uploadedAvatar || dbUser.avatar || '',
        nickname: inputNickName || dbUser.nickname || '',
      },
    });
    await updateAllScoreData();
    setUser((prev) => ({
      ...prev,
      avatar: uploadedAvatar || dbUser.avatar || '',
      nickname: inputNickName || dbUser.nickname || '',
    }));
    Taro.hideLoading();
    Taro.showToast({
      title: '更新成功',
      icon: 'success',
    });
  };

  const checkAndSetInputNickname = (nickname: string) => {
    setInputNickName(nickname);
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
        <View className={classNames(styles.item, styles.tall)}>
          <View className={styles.label}>头像</View>
          <View className={styles.value}>
            <Button
              className={styles.avatarWrapper}
              openType="chooseAvatar"
              onChooseAvatar={handleChooseAvatar}
            >
              <Image src={inputAvatar} className={styles.avatar} />
              <ArrowSize6 className={styles.icon} size={12} color="#666666" />
            </Button>
          </View>
        </View>

        <View
          className={styles.line}
          style={{ backgroundColor: themeColor.gridBorderColor }}
        ></View>

        <View className={styles.item}>
          <View className={styles.label}>昵称</View>
          <View className={styles.value}>
            <Input
              type="nickname"
              placeholder="请输入昵称"
              className={styles.nickname}
              onInput={(e) => checkAndSetInputNickname(e.detail.value)}
              value={inputNickName}
              maxlength={20}
            ></Input>
          </View>
        </View>

        <View className={styles.btnContainer}>
          <CustomButton value={'确认'} onClick={handleSubmit} type="primary" />
        </View>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
