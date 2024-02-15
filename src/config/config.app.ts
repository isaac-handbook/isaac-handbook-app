import { ExamSeasonConfig, UpdateInfo } from './type';

// 当前版本
const version = '2.0.0';

// 更新通知
const updateNotice: UpdateInfo = {
  // 通知
  notices: [],
  // 功能更新
  features: [
    {
      title: '以撒课堂上线！！！',
      content: ['想证明你的游戏理解吗？不同段位的题目等你来挑战~'],
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
};

export const examSeasonConfig: ExamSeasonConfig = {
  seasonList: [
    {
      enable: true,
      name: '道具篇：上',
      id: 'item1',
      enableEndless: true,
      rankStatus: 'local',
      endlessRankStatus: 'query',
    },
    {
      enable: true,
      name: '道具篇：下',
      id: 'item2',
      enableEndless: false,
      rankStatus: 'query',
      endlessRankStatus: 'query',
    },
  ],
  /** 道具篇的分隔道具ID */
  itemSeasonSplitID: 300,
};
