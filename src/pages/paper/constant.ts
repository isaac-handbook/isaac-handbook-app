export const levelStringMap = {
  '1': '青铜',
  '2': '白银',
  '3': '钻石',
  '100': '王者',
};

export const paperLevelMap = {
  '1': {
    stageMap: [
      // { stage: 1, count: 7 },
      { stage: 1, count: 0 },
      { stage: 2, count: 2 },
      { stage: 3, count: 1 },
    ],
    sort: true,
  },
  '2': {
    stageMap: [
      { stage: 1, count: 2 },
      { stage: 2, count: 7 },
      { stage: 3, count: 1 },
    ],
    sort: true,
  },
  '3': {
    stageMap: [
      { stage: 1, count: 1 },
      { stage: 2, count: 2 },
      { stage: 3, count: 7 },
    ],
    sort: true,
  },
  '100': {
    stageMap: [
      { stage: 1, count: 10 },
      { stage: 2, count: 20 },
      { stage: 3, count: 20 },
    ],
    sort: false,
  },
};
