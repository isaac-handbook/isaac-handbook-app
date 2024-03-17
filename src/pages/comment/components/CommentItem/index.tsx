import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import styles from './index.module.scss';
import { CommentType } from '@typers/comment';
import emptyAvatar from '@assets/emptyAvatar.png';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ArrowRight, Fabulous } from '@nutui/icons-react-taro';
import 'dayjs/locale/zh-cn';
import { useThemeInfo } from '@hooks/useThemeInfo';
import Taro from '@tarojs/taro';
import { useUser } from '@hooks/useUser';
import { useLockFn } from 'ahooks';
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

interface Props {
  comment: CommentType;
  updateSimgleCommentLike: (
    comment: CommentType,
    type: '+1' | '-1',
  ) => Promise<void>;
}

export const CommentItem: React.FC<Props> = (props) => {
  const { comment, updateSimgleCommentLike } = props;

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const {
    user: { openid },
  } = useUser();

  const handleLike = useLockFn(async () => {
    Taro.showLoading({
      title: '处理中',
    });
    // 如果已经点赞了，就取消点赞
    if (comment.liked) {
      // 从 comment_like 表删除当前用户的点赞记录
      const db = Taro.cloud.database();
      const likeCol = db.collection('comment_like');
      await likeCol
        .where({
          commentId: comment.id,
          _openid: openid,
          itemId: comment.itemId,
          itemType: comment.itemType,
        })
        // @ts-ignore
        .remove();
      await updateSimgleCommentLike(comment, '-1');
      Taro.hideLoading();
      // 震动一下
      Taro.vibrateShort();
      return;
    }
    // 给 comment_like 表添加当前用户的点赞记录
    const db = Taro.cloud.database();
    const likeCol = db.collection('comment_like');
    await likeCol.add({
      data: {
        commentId: comment.id,
        itemId: comment.itemId,
        itemType: comment.itemType,
        createTime: new Date(),
      },
    });
    await updateSimgleCommentLike(comment, '+1');
    Taro.vibrateShort();
    Taro.hideLoading();
  });

  return (
    <View className={styles.container}>
      <View
        className={styles.line}
        style={{ background: themeColor.gridBorderColor }}
      />

      <View className={styles.top}>
        <Image className={styles.avator} src={comment.avator || emptyAvatar} />
        <View className={styles.center}>
          <View className={styles.name}>{comment.nickname}</View>
          <View className={styles.time}>
            {dayjs().from(dayjs(comment.createTime)).replace(' ', '')}
          </View>
        </View>
        <View
          className={styles.like}
          style={{ color: comment.liked ? 'red' : 'inherit' }}
          onClick={handleLike}
        >
          <View className={styles.likeCount}>{comment.likeCount || 0}</View>
          <Fabulous size={16} />
        </View>
      </View>
      <View className={styles.content}>
        <Text>{comment.content.replace(/<br\/>/g, '\n')}</Text>
      </View>
      {comment.replyCount && (
        <View className={styles.reply}>
          {comment.replyCount}条回复
          <ArrowRight />
        </View>
      )}
    </View>
  );
};
