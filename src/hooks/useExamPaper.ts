import Taro from '@tarojs/taro';
import { ExamRawData, Topic, UserAnswer } from '../types/exam';
import { atom, useRecoilState } from 'recoil';
import { refreshExamData } from '@src/actions/exam/refreshExamData';

export type UserScoreMap = {
  level1: number;
  level2: number;
  level3: number;
  level100: number;
  level999: number;
};

export const defaultUserScoreMap: UserScoreMap = {
  level1: 0,
  level2: 0,
  level3: 0,
  level100: 0,
  level999: 0,
};

interface ExamPaper {
  /** 原始试卷数据 */
  examRawData: ExamRawData;
  /** 当前生成的试卷 */
  topicList: Topic[];
  /** 用户当前处于哪一题 */
  currentTopicIndex: number;
  /** 用户当前选择的答案 */
  userAnswerList: UserAnswer[];
  /** 用户的分数记录 */
  userScoreMap: UserScoreMap;
  /** 试卷完成后的广告实例 */
  examFinishAd: Taro.InterstitialAd | null;
}

const defaultExamPaper: ExamPaper = {
  examRawData: {
    item: [],
  },
  currentTopicIndex: 1,
  topicList: [],
  userAnswerList: [],
  userScoreMap: defaultUserScoreMap,
  examFinishAd: null,
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
  const submitSingleTopic = (answer: number | null, delay = 0) => {
    updateSingleExamPaperState('userAnswerList', [
      ...examPaper.userAnswerList,
      answer,
    ]);
    // 到下一题
    setTimeout(() => {
      updateSingleExamPaperState(
        'currentTopicIndex',
        examPaper.currentTopicIndex + 1,
      );
    }, delay);
  };

  /** 清空试卷 */
  const clearExamPaper = () => {
    setExamPaper((prev) => ({
      ...defaultExamPaper,
      userScoreMap: prev.userScoreMap,
      examRawData: prev.examRawData,
    }));
  };

  /** 阅卷，得出分数 */
  const getScore = () => {
    const { topicList, userAnswerList } = examPaper;
    const correctCount = topicList.reduce((prev, curr, index) => {
      if (curr.answer === userAnswerList[index]) {
        return prev + 1;
      }
      return prev;
    }, 0);
    // 换算成百分制
    const totalCount = topicList.length;
    const scorePercent = (correctCount / totalCount) * 100;
    return {
      score: Math.round(scorePercent),
      totalCount,
      correctCount,
    };
  };

  /** 更新 examRawData 中的某个数据 */
  const updateSingleExamRawData = <T extends keyof ExamRawData>(
    key: T,
    value: any,
  ) => {
    updateSingleExamPaperState('examRawData', {
      ...examPaper.examRawData,
      [key]: value,
    });
  };

  /** 刷新题目数据（重新下载） */
  const forceRefresh = async () => {
    const newHandbookData = await refreshExamData();
    updateSingleExamPaperState('examRawData', newHandbookData);
  };

  return {
    examPaper,
    forceRefresh,
    getScore,
    updateSingleExamPaperState,
    updateSingleExamRawData,
    clearExamPaper,
    submitSingleTopic,
  };
};
