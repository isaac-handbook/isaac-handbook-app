import { levelStringMap } from '@pages/paper/constant';
import { UserScore } from '..';

/** 将用户当前分数集合转换成段位 */
export const userScoreToStageString = (userScore: UserScore) => {
  if (userScore.level1 < 60) {
    return levelStringMap['1'];
  }
  if (userScore.level1 >= 60 && userScore.level2 < 60) {
    return levelStringMap['2'];
  }
  if (userScore.level2 >= 60 && userScore.level3 < 60) {
    return levelStringMap['3'];
  }
  if (userScore.level3 >= 60) {
    return levelStringMap['100'];
  }
  return '未知';
};
