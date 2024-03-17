import Taro from '@tarojs/taro';
import { CommentType } from '@typers/comment';
import { ItemType } from '@typers/handbook';

export type OrderType = 'new' | 'hot';

interface Options {
  itemId: string;
  itemType: ItemType;
  orderType: OrderType;
  fetchedLength: number;
  limit?: number;
}

/**
 * 查询从某一个id往后的评论
 */
export const queryCommentByStartId = async (options: Options) => {
  const {
    fetchedLength = 0,
    limit = 20,
    itemId,
    itemType,
    orderType,
  } = options;
  const db = Taro.cloud.database();
  const col = db.collection('comment');

  // 时间排序
  if (orderType === 'new') {
    const res = await col
      .orderBy('id', 'desc')
      .skip(fetchedLength)
      .where({
        archive: null,
        itemId,
        itemType,
      })
      .limit(limit)
      .get();
    return res.data as CommentType[];
  }

  // 热度排序
  const res = await col
    .orderBy('likeCount', 'desc')
    .orderBy('id', 'desc')
    .skip(fetchedLength)
    .where({
      archive: null,
      itemId,
      itemType,
    })
    .limit(limit)
    .get();
  return res.data as CommentType[];
};
