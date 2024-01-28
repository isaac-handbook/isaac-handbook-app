import { Button, Image, Input, View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { useUser } from '@hooks/useUser';
import { ArrowSize6 } from '@nutui/icons-react-taro';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const {
    user: { avatar, nickName, openid },
  } = useUser();

  const [inputNickName, setInputNickName] = useState<string>(nickName);
  const [inputAvatar, setInputAvatar] = useState<string>(avatar);
  const [uploadedAvatar, setUploadedAvatar] = useState<string>();

  useEffect(() => {
    if (nickName) {
      setInputNickName(nickName);
    }
    if (avatar) {
      setInputAvatar(avatar);
    }
  }, [avatar, nickName]);

  const handleChooseAvatar = (e) => {
    const tmpUrl = e.detail?.avatarUrl;
    if (!tmpUrl) {
      Taro.showToast({
        title: '获取头像失败',
        icon: 'none',
      });
      return;
    }
    // 上传到对象存储 user-avatar 目录下
    const cloudPath = `user-avatar/${openid}.png`;
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

  const handleSubmit = () => {
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
    queryRes.get().then(async (res) => {
      if (res.data.length === 0) {
        // 插入一条新的记录
        await col.add({
          data: {
            avatar: uploadedAvatar,
            nickName: inputNickName,
          },
        });
      } else {
        // 更新记录
        await col.doc(res.data[0]._id as any).update({
          data: {
            avatar: uploadedAvatar,
            nickName: inputNickName,
          },
        });
      }
      Taro.hideLoading();
      Taro.showToast({
        title: '更新成功',
        icon: 'success',
      });
    });
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
              className={styles.nickName}
              onInput={(e) => setInputNickName(e.detail.value)}
              value={inputNickName}
            ></Input>
          </View>
        </View>

        <Button className={styles.submit} onClick={handleSubmit}>
          确认
        </Button>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
