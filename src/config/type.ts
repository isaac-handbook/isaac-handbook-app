type Notice = {
  title: string;
  content?: string[];
  extra?: Record<string, any>;
};

export type UpdateInfo = Record<
  ['notices', 'features', 'bugs', 'btns'][number],
  Notice[]
>;

export type Season = {
  /** 赛季名 */
  name: string;
  /** 赛季ID */
  id: 'item1' | 'item2';
  /** 赛季是否开启 */
  enable: boolean;
  /** 是否开启无尽模式 */
  enableEndless: boolean;
  /** 王者排名的状态 */
  rankStatus: 'query' | 'local' | 'closed';
  /** 无尽排名的状态 */
  endlessRankStatus: 'query' | 'local' | 'closed';
};

export type ExamSeasonConfig = {
  seasonList: Season[];
  itemSeasonSplitID: number;
};
