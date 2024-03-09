import { ExamSeasonConfig, UpdateInfo } from './type';

// 当前版本
const version = '2.2.0';

// 更新通知
const updateNotice: UpdateInfo = {
  // 通知
  notices: [],
  // 功能更新
  features: [
    {
      title: '「课堂」道具篇：下',
      content: ['全新题目，更有挑战~'],
    },
    // {
    //   title: '「课堂」新题库即将到来',
    //   content: ['开发者说：正在编了'],
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
};

export const examSeasonConfig: ExamSeasonConfig = {
  seasonList: [
    {
      enable: true,
      name: '道具篇：下',
      id: 'item2',
      enableEndless: true,
      rankStatus: 'query',
      endlessRankStatus: 'query',
    },
    {
      enable: true,
      name: '道具篇：上',
      id: 'item1',
      enableEndless: true,
      rankStatus: 'local',
      endlessRankStatus: 'query',
    },
  ],
  /** 道具篇的分隔道具ID */
  itemSeasonSplitID: 365,
};
