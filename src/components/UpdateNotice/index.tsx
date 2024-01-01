import React, { memo } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Overlay } from '@nutui/nutui-react-taro';
import { updateInfo } from '@src/config/config.app';
import Taro from '@tarojs/taro';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { Close, Notice, ShieldCheck, ThumbsUp } from '@nutui/icons-react-taro';
import { useAsyncEffect } from 'ahooks';
import { useHandBookData } from '@hooks/useHandbookData';
import { sleep } from '@utils/sleep';

const Cell: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();
  const { forceRefresh } = useHandBookData();

  const { version, updateNotice } = updateInfo;
  const { notices, features, bugs, btns } = updateNotice;

  useAsyncEffect(async () => {
    // 和本地缓存的版本号比较，如果不一致，就显示更新提示
    const localAppInfo = Taro.getStorageSync('appInfo');
    // 版本有变，显示更新提示
    if (localAppInfo.version !== version) {
      setVisible(true);
      // 更新本地缓存
      Taro.setStorageSync('appInfo', {
        ...localAppInfo,
        version,
      });

      await sleep(500);
      // 本次是否要强制刷新
      if (updateInfo.forceRefreshNow) {
        forceRefresh();
      }
    }
  }, []);

  const renderContent = () => {
    const renderNotes = (notes: typeof notices) => {
      return (
        <>
          {notes.map((notice, noticeIndex) => (
            <View
              key={`${notice.title}noticeIndex`}
              className={styles.notice}
              // style={{ background: '#c4b39d' }}
            >
              <View className={styles.nTitle}>
                {`${noticeIndex + 1}. `}
                {notice.title}
              </View>
              <View className={styles.nList}>
                {notice.content?.map((content, contentIndex) => (
                  <View
                    className={styles.nContent}
                    key={`${notice.title}content${contentIndex}`}
                  >
                    {content}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </>
      );
    };
    return (
      <View className={styles.cell}>
        {notices.length > 0 && (
          <>
            <View className={styles.subTitle}>
              <Notice size={'16'} color="#739ede" />
              <View className={styles.icon}>通知</View>
            </View>
            {renderNotes(notices)}
          </>
        )}

        {features.length > 0 && (
          <>
            <View className={styles.subTitle}>
              <ThumbsUp size={'16'} color="#739ede" />
              <View className={styles.icon}>功能更新</View>
            </View>
            {renderNotes(features)}
          </>
        )}

        {bugs.length > 0 && (
          <>
            <View className={styles.subTitle}>
              <ShieldCheck size={'16'} color="#739ede" />
              <View className={styles.icon}>修复问题</View>
            </View>
            {renderNotes(bugs)}
          </>
        )}
      </View>
    );
  };

  return (
    <Overlay visible={visible}>
      <View className={styles.wrapper}>
        <View
          className={styles.container}
          style={{
            background: themeColor.bgColor,
            color: themeColor.textColor,
          }}
        >
          <View className={styles.inner}>
            <View className={styles.title}>{version} 版本更新提示</View>
            <View className={styles.content}>{renderContent()}</View>
          </View>

          {btns.length > 0 && <View className={styles.btns}>233</View>}

          <View className={styles.close} onClick={() => setVisible(false)}>
            <Close size={'20'} color="#eeeeee" />
          </View>
        </View>
      </View>
    </Overlay>
  );
};

export const UpdateNotice = memo(Cell);
