import { ItemType } from './handbook';

export type UploadComment = Omit<CommentType, '_id' | '_openid'>;

/** 评论的额外信息，UI使用，不落库 */
interface CommentExtraType {
  /** 用户是否已点赞 */
  liked?: boolean;
}

/** 评论信息，落库 */
export interface CommentType extends CommentExtraType {
  /** 自定义的 ID，用于计数 */
  id: number;

  /** 评论 ID */
  _id: string;

  /** 评论者 openis */
  _openid: string;

  /** 评论的物品类型 */
  itemType: ItemType;

  /** 评论的物品 ID */
  itemId: string;

  /** 评论内容 */
  content: string;

  /** 评论类型 普通 or 回复 */
  type: 'normal' | 'reply';

  /** 评论者昵称 */
  nickname: string;

  /** 评论者头像 */
  avator?: string;

  /** 评论时间 */
  createTime: Date;

  /** 评论者 IP */
  ip?: string;

  /** 评论者地理位置 */
  region?: string;

  /** 是否已归档 */
  archive?: boolean;

  /** 主回复评论的 ID，只有回复型有 */
  baseId?: string;

  /** 父级评论的 ID，只有回复型有 */
  parentId?: string;

  /** 父级评论的用户昵称 */
  parentNickname?: string;

  /** 父级评论的用户 openid */
  parentOpenid?: string;

  /** 当前评论有多少回复，只有普通型有 */
  replyCount?: number;

  /** 当前评论被举报了多少次 */
  reportCount?: number;

  /** 当前评论的点赞数 */
  likeCount?: number;
}
