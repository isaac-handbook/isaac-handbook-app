import { UpdateInfo } from './type';

// 当前版本
const version = '1.6.0';

// 是否要强制刷新
const forceRefreshNow = false;

// 更新通知
const updateNotice: UpdateInfo = {
  // 通知
  notices: [],
  // 功能更新
  features: [
    {
      title: '拍照识图查道具功能',
      content: ['目前处于实验阶段，欢迎来尝鲜~'],
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
