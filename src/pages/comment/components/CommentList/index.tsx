import React, { useEffect, useMemo, useState } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useDebounceFn } from 'ahooks';
import { CommentType } from '@typers/comment';
import { OrderType, queryCommentByStartId } from './query';
import { ScrollList } from '@components/ScrollList';
import { useDev } from '@hooks/useDev';
import { ItemType } from '@typers/handbook';
import { CommentItem } from '../CommentItem';
import Taro from '@tarojs/taro';
import { useUser } from '@hooks/useUser';
import { useThemeInfo } from '@hooks/useThemeInfo';

const LIMIT = 20;

interface Props {
  itemId: string;
  type: ItemType;
  header: React.ReactNode;
}

export const CommentList: React.FC<Props> = (props) => {
  const { itemId, type } = props;

  // 评论列表
  const [fetchedCmts, setFetchedCmts] = useState<CommentType[]>([]);
  const lastCommentRef = React.useRef<any>();

  // 加载态
  const [loading, setLoading] = useState(false);
  const loadingRef = React.useRef<boolean>(false);

  // 完成态
  const [finished, setFinished] = useState(false);
  const finishedRef = React.useRef<boolean>(false);

  // 排序方式
  const [orderType, setOrderType] = useState<OrderType>('hot');

  // 评论数量
  const [commentCount, setCommentCount] = useState(0);

  const { isIOS } = useDev();
  const {
    user: { openid },
  } = useUser();
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const fetchedLength = useMemo(() => fetchedCmts.length, [fetchedCmts]);

  const updateSimgleCommentLike = async (
    comment: CommentType,
    type: '+1' | '-1',
  ) => {
    // 更新 comment 表的 likeCount 字段
    const db = Taro.cloud.database();
    const likeCol = db.collection('comment_like');
    // 查询 comment_like 表，获取当前评论的点赞总数
    const queryTotal = await likeCol
      .where({
        commentId: comment.id,
      })
      .count();
    const likeCount = queryTotal.total;
    await db.collection('comment').doc(comment._id).update({
      data: {
        likeCount,
      },
    });
    // 更新当前评论的点赞状态
    setFetchedCmts((pre) => {
      return pre.map((cmt) => {
        if (cmt.id === comment.id) {
          return {
            ...cmt,
            liked: type === '+1' ? true : false,
            likeCount,
          };
        }
        return cmt;
      });
    });
  };

  // 计算评论数量
  useEffect(() => {
    const db = Taro.cloud.database();
    const likeCol = db.collection('comment');
    likeCol
      .where({
        archive: null,
        itemId,
        itemType: type,
      })
      .count()
      .then((res) => {
        setCommentCount(res.total);
      });
  }, []);

  useEffect(() => {
    if (!fetchedCmts.length) {
      return;
    }
    // 查询 comment_like 表，获取当前用户的点赞记录
    const db = Taro.cloud.database();
    const likeCol = db.collection('comment_like');
    likeCol
      .where({
        _openid: openid,
        itemId,
        itemType: type,
      })
      .skip(fetchedCmts.filter((cmt) => cmt.liked).length)
      .orderBy('commentId', 'desc')
      .limit(LIMIT)
      .get()
      .then((res) => {
        const likeList = res.data;
        setFetchedCmts((pre) => {
          return pre.map((cmt) => {
            if (likeList.some((like) => like.commentId === cmt.id)) {
              return {
                ...cmt,
                liked: true,
              };
            }
            return cmt;
          });
        });
      });
  }, [fetchedLength]);

  const { run: request } = useDebounceFn(
    async (startId?: number) => {
      const res = await queryCommentByStartId({
        fetchedLength: fetchedCmts.length,
        limit: LIMIT,
        itemId,
        itemType: type,
        orderType,
      });
      setLoading(false);
      if (!startId) {
        setFetchedCmts(res);
      } else if (res?.length > 0) {
        setFetchedCmts((pre) => [...pre, ...res]);
      }
      if (res?.length < LIMIT) {
        // 不需要再请求了
        setFinished(true);
      }
    },
    {
      leading: true,
      trailing: false,
      wait: 200,
    },
  );

  const onScroll = () => {
    setLoading(true);
    request(lastCommentRef.current?.id);
  };

  useEffect(() => {
    onScroll();
  }, []);

  useEffect(() => {
    lastCommentRef.current = fetchedCmts[fetchedCmts.length - 1];
  }, [fetchedCmts]);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    finishedRef.current = finished;
  }, [finished]);

  const itemRender = (data: CommentType) => {
    return (
      <CommentItem
        comment={data}
        updateSimgleCommentLike={updateSimgleCommentLike}
      />
    );
  };

  const handleScrollToLower = () => {
    if (loadingRef.current) {
      return;
    }
    if (finishedRef.current) {
      return;
    }
    onScroll();
  };

  const handleOrderChange = (type: OrderType) => {
    if (type === orderType) {
      return;
    }
    setOrderType(type);
    setFinished(false);
    setLoading(true);
    setFetchedCmts([]);
    setTimeout(() => {
      request();
    }, 200);
  };

  return (
    <View className={styles.container}>
      <ScrollList
        height={`calc(100vh - ${isIOS ? 190 : 168}rpx)`}
        onScrollToLower={handleScrollToLower}
        bottomLoading={loading}
        finished={finished}
      >
        <View className={styles.scrollInner}>
          {props.header}
          <View
            className={styles.commentNav}
            style={{ backgroundColor: themeColor.bgColor }}
          >
            <View className={styles.commentNavItem}>
              {`评论(${commentCount})`}
            </View>
            <View
              className={styles.commentNavItem}
              onClick={() => handleOrderChange('hot')}
              style={{
                opacity: orderType === 'hot' ? 1 : 0.6,
              }}
            >
              最热
            </View>
            <View
              className={styles.commentNavItem}
              onClick={() => handleOrderChange('new')}
              style={{
                opacity: orderType === 'new' ? 1 : 0.6,
              }}
            >
              最新
            </View>
          </View>
          {fetchedCmts.map((cmt) => {
            return itemRender(cmt);
          })}
        </View>
      </ScrollList>
    </View>
  );
};
