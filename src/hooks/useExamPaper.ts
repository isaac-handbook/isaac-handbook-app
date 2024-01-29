import { ExamRawData, Topic, UserAnswer } from '../types/exam';
import { atom, useRecoilState } from 'recoil';

export type UserScoreMap = {
  level1: number;
  level2: number;
  level3: number;
  level100: number;
};

export const defaultUserScoreMap: UserScoreMap = {
  level1: 0,
  level2: 0,
  level3: 0,
  level100: 0,
};

interface ExamPaper {
  // 原始试卷数据
  rawData: ExamRawData;
  // 当前生成的试卷
  topicList: Topic[];
  // 用户当前选择的答案
  userAnswerList: UserAnswer[];
  // 用户的分数记录
  userScoreMap: UserScoreMap;
}

const defaultExamPaper: ExamPaper = {
  rawData: {},
  topicList: [],
  userAnswerList: [],
  userScoreMap: defaultUserScoreMap,
};

export const examPaperState = atom<ExamPaper>({
  key: 'examPaperState',
  default: defaultExamPaper,
});

export const useExamPaper = () => {
  const [examPaper, setExamPaper] = useRecoilState(examPaperState);

  const updateSingleExamPaperState = <T extends keyof ExamPaper>(
    key: T,
    value: ExamPaper[T],
  ) => {
    setExamPaper((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /** 提交一次答案 */
  const submitSingleTopic = (answer: number | null) => {
    updateSingleExamPaperState('userAnswerList', [
      ...examPaper.userAnswerList,
      answer,
    ]);
  };

  /** 清空试卷 */
  const clearExamPaper = () => {
    setExamPaper((prev) => ({
      ...defaultExamPaper,
      userScoreMap: prev.userScoreMap,
    }));
  };

  /** 阅卷，得出分数 */
  const getScore = () => {
    const { topicList, userAnswerList } = examPaper;
    const score = topicList.reduce((prev, curr, index) => {
      if (curr.answer === userAnswerList[index]) {
        return prev + 1;
      }
      return prev;
    }, 0);
    // 换算成百分制
    const totalScore = topicList.length;
    const scorePercent = (score / totalScore) * 100;
    return Math.floor(scorePercent);
  };

  return {
    examPaper,
    getScore,
    updateSingleExamPaperState,
    clearExamPaper,
    submitSingleTopic,
  };
};
