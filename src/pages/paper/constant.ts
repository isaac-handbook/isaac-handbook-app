export const levelStringMap = {
  '1': '青铜',
  '2': '白银',
  '3': '钻石',
  '100': '王者',
  '999': '无尽',
};

type PaperLevelMap = {
  [key: string]: {
    stageMap: {
      stage: number;
      count: number;
    }[];
    sort: boolean;
  };
};

export const paperLevelMap: PaperLevelMap = {
  '1': {
    stageMap: [
      { stage: 1, count: 7 },
      // { stage: 1, count: 0 },
      { stage: 2, count: 3 },
      { stage: 3, count: 0 },
    ],
    sort: true,
  },
  '2': {
    stageMap: [
      { stage: 1, count: 3 },
      { stage: 2, count: 10 },
      { stage: 3, count: 2 },
    ],
    sort: true,
  },
  '3': {
    stageMap: [
      { stage: 1, count: 2 },
      { stage: 2, count: 6 },
      { stage: 3, count: 12 },
    ],
    sort: true,
  },
  '100': {
    stageMap: [
      { stage: 1, count: 0 },
      { stage: 2, count: 25 },
      { stage: 3, count: 25 },
    ],
    sort: false,
  },
};
