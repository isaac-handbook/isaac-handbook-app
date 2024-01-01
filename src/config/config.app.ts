import { UpdateInfo } from './type';

// 当前版本
const version = '1.3.0';

// 是否要强制刷新
const forceRefreshNow = false;

// 更新通知
const updateNotice: UpdateInfo = {
  // 通知
  notices: [],
  // 功能更新
  features: [
    {
      title: '更好的道具颜色排序',
      content: ['在左上角设置-排序方式中，可以选择按照道具颜色排序'],
    },
    // {
    //   title: '道具颜色分类',
    //   content: ['还是点右上角试试吧~'],
    // },
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
