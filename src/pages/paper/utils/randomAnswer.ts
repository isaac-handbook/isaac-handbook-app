import _ from 'lodash';

/**
 * 打乱选项
 * @param semiOptions
 */
export const randomAnswer = (correct: any, wrongList: any[], count = 3) => {
  let cuttedWrongList = wrongList;
  if (wrongList.length > count - 1) {
    cuttedWrongList = wrongList.slice(0, count - 1);
  }
  const shuffledOptions = _.shuffle([correct, ...cuttedWrongList]);
  const answer = shuffledOptions.findIndex((option) => option === correct);

  return {
    options: shuffledOptions,
    answer,
  };
};
