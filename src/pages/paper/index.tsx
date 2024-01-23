import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { useHandBookData } from '@hooks/useHandbookData';
import { paperGenerator } from '@pages/paper/utils/paper/generator';
import { useEffect, useMemo } from 'react';
import itemExamRawData from './item.json';
import { useExamPaper } from '@hooks/useExamPaper';
import { Header } from './components/Header';
import { Question } from './components/Question';
import { Options } from './components/Options';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const {
    handbookData: { items },
  } = useHandBookData();

  const {
    examPaper: { userAnswerList, topicList },
    updateSingleExamPaperState,
    clearExamPaper,
  } = useExamPaper();

  useEffect(() => {
    if (!items?.length) return;
    const newTopicList = paperGenerator({
      items,
      topicMetaList: itemExamRawData.item as unknown as any,
      condition: [
        { stage: 1, count: 10 },
        { stage: 2, count: 10 },
        { stage: 3, count: 10 },
      ],
    });
    updateSingleExamPaperState('topicList', newTopicList);
    console.log('生成试卷', newTopicList);

    return () => {
      // 用户退出页面，清空试卷
      clearExamPaper();
      console.warn('清空试卷');
    };
  }, [items]);

  // 用户当前在答第几题
  const curIndex = useMemo(() => userAnswerList.length + 1, [userAnswerList]);

  // 当前已经完成了答题
  const isFinished = curIndex === topicList.length;

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
      >
        {isFinished ? (
          <View>已完成</View>
        ) : (
          <>
            <Header curIndex={curIndex} />
            <Question curIndex={curIndex} />
            <Options curIndex={curIndex} />
          </>
        )}
      </View>
    </ErrorBoundary>
  );
}

export default Index;
