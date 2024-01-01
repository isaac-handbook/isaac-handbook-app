import React, { memo } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Overlay } from '@nutui/nutui-react-taro';
import { updateInfo } from '@src/config/config.app';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { Close, Notice, ShieldCheck, ThumbsUp } from '@nutui/icons-react-taro';
import { useUI } from '@hooks/useUI';

const Cell: React.FC = () => {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();
  const {
    ui: { showUpdateModal },
    updateSingleUIState,
  } = useUI();

  const { version, updateNotice } = updateInfo;
  const { notices, features, bugs, btns } = updateNotice;

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
    <Overlay visible={showUpdateModal}>
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

          <View
            className={styles.close}
            onClick={() => updateSingleUIState('showUpdateModal', false)}
          >
            <Close size={'20'} color="#eeeeee" />
          </View>
        </View>
      </View>
    </Overlay>
  );
};

export const UpdateNotice = memo(Cell);
