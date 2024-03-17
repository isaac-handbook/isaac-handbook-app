import React from 'react';
import { Textarea, View } from '@tarojs/components';
import styles from './index.module.scss';

import Taro from '@tarojs/taro';
import { useDev } from '@hooks/useDev';
import { useRecoilState } from 'recoil';
import { themeInfoState } from '@hooks/useThemeInfo';
import { UploadComment } from '@typers/comment';
import { ItemType } from '@typers/handbook';
import { useUser } from '@hooks/useUser';

interface Props {
  itemId: string;
  type: ItemType;
}

/** 最大评论字数 */
const MAX_LENGTH = 140;

export const InputComment: React.FC<Props> = (props) => {
  const { itemId, type } = props;

  const inputRef = React.useRef<any>();

  const { isIOS } = useDev();
  const { user } = useUser();

  const [{ themeColor }] = useRecoilState(themeInfoState);

  const [inputFocus, setInputFocus] = React.useState<boolean>(false);
  const [inputValue, setInputComment] = React.useState<string>('');

  const handleConfirm = () => {
    if (!inputValue) {
      return;
    }
    const content = inputValue.replace(/\n/g, '<br/>');
    // 提交评论，存到 comment 表中
    const db = Taro.cloud.database();
    const col = db.collection('comment');
    // 查询一下当前 id 最大是多少
    col
      .orderBy('id', 'desc')
      .limit(1)
      .get()
      .then((res) => {
        const maxId = res.data[0]?.id ?? 0;
        // 添加评论
        const newComment: UploadComment = {
          id: maxId + 1,
          itemId: itemId,
          type: 'normal',
          itemType: type,
          content: content,
          createTime: new Date(),
          nickname: user.nickname,
          avator: user.avatar,
        };
        col.add({
          data: newComment,
          success: () => {
            Taro.showToast({
              title: '评论成功',
              icon: 'success',
            });
            setInputComment('');
            inputRef.current?.blur();
          },
          fail: () => {
            Taro.showToast({
              title: '评论失败',
              icon: 'none',
            });
          },
        });
      });
  };

  return (
    <View
      className={styles.bottom}
      style={{
        backgroundColor: themeColor.gridColor,
        paddingBottom: inputFocus ? '32rpx' : isIOS ? '80rpx' : '56rpx',
      }}
    >
      <Textarea
        style={{
          height: inputFocus ? '160rpx' : isIOS ? '72rpx' : '48rpx',
          paddingTop: isIOS ? '8rpx' : '24rpx',
          paddingBottom: isIOS ? '8rpx' : '16rpx',
        }}
        ref={inputRef}
        value={inputValue}
        className={styles.textArea}
        onConfirm={handleConfirm}
        cursorSpacing={80}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        showConfirmBar={false}
        maxlength={MAX_LENGTH}
        placeholder="评论千万条，友善第一条"
        onInput={(e) => {
          const value = e.detail.value;
          if (value.length >= MAX_LENGTH) {
            Taro.showToast({
              title: `最多输入${MAX_LENGTH}个字符`,
              icon: 'none',
            });
          }
          setInputComment(e.detail.value);
        }}
      />
      <View
        className={styles.send}
        style={{ opacity: !!inputValue ? 1 : 0.5 }}
        onClick={handleConfirm}
      >
        发送
      </View>
    </View>
  );
};
