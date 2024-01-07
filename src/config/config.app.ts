import { UpdateInfo } from './type';

// 当前版本
const version = '1.5.0';

// 是否要强制刷新
const forceRefreshNow = false;

// 更新通知
const updateNotice: UpdateInfo = {
  // 通知
  notices: [],
  // 功能更新
  features: [
    {
      title: '【道具和饰品】按照颜色过滤',
      content: ['点击顶部的颜色按钮试试吧~'],
    },
    {
      title: '【道具和饰品】翻页功能',
    },
  ],
  // 问题修复
  bugs: [
    // {
    //   title: '修复了一些小错误',
    //   // content: ['还是点右上角试试吧~'],
    // },
  ],
  // 行动按钮
  btns: [],
};

export const updateInfo = {
  version,
  updateNotice,
  forceRefreshNow,
};
