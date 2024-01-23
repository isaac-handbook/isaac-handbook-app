import { ExamRawData, Topic, UserAnswer } from '../types/exam';
import { atom, useRecoilState } from 'recoil';

interface ExamPaper {
  // 原始试卷数据
  rawData: ExamRawData;
  // 当前生成的试卷
  topicList: Topic[];
  // 用户当前选择的答案
  userAnswerList: UserAnswer[];
}

const defaultExamPaper: ExamPaper = {
  rawData: {},
  topicList: [],
  userAnswerList: [],
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
    setExamPaper({
      ...examPaper,
      [key]: value,
    });
  };

  /** 交一份白卷 */
  const submitWhitePaper = () => {
    updateSingleExamPaperState('userAnswerList', [
      ...examPaper.userAnswerList,
      null,
    ]);
  };

  /** 提交一次答案 */
  const submitSingleTopic = (answer: number) => {
    updateSingleExamPaperState('userAnswerList', [
      ...examPaper.userAnswerList,
      answer,
    ]);
  };

  /** 清空试卷 */
  const clearExamPaper = () => {
    setExamPaper(defaultExamPaper);
  };

  return {
    examPaper,
    updateSingleExamPaperState,
    submitWhitePaper,
    clearExamPaper,
    submitSingleTopic,
  };
};
