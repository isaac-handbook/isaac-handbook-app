// 存储在云数据库中的应用设置
export type AppDBConfig = {
  // 图鉴主数据 handbook.json 的版本
  handbookJSONVersion: number;
  // 问卷数据 question.json 的版本
  questionJSONVersion: number;
};
