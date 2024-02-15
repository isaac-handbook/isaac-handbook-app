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
      name: '道具篇：上',
      id: 'item1',
      enable: true,
      enableEndless: true,
      rankStatus: 'local',
      endlessRankStatus: 'query',
    },
    {
      name: '道具篇：下',
      id: 'item2',
      enable: false,
      enableEndless: false,
      rankStatus: 'query',
      endlessRankStatus: 'query',
    },
  ],
};
