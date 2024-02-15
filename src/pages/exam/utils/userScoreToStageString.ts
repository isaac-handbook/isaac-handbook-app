import { UserScoreMap } from '@hooks/useExamPaper';
import { levelStringMap } from '@pages/paper/constant';
import { examSeasonConfig } from '@src/config/config.app';

const curSeasonID = examSeasonConfig.seasonList[0].id;

/** 将用户当前分数集合转换成段位 */
export const userScoreToStageString = (userScore: UserScoreMap) => {
  if (userScore[curSeasonID].level1 < 60) {
    return levelStringMap['1'];
  }
  if (
    userScore[curSeasonID].level1 >= 60 &&
    userScore[curSeasonID].level2 < 60
  ) {
    return levelStringMap['2'];
  }
  if (
    userScore[curSeasonID].level2 >= 60 &&
    userScore[curSeasonID].level3 < 60
  ) {
    return levelStringMap['3'];
  }
  if (userScore[curSeasonID].level3 >= 60) {
    return levelStringMap['100'];
  }
  return '未知';
};
