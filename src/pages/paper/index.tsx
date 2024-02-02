import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { useHandBookData } from '@hooks/useHandbookData';
import { paperGenerator } from '@pages/paper/utils/paper/generator';
import { useEffect, useMemo, useState } from 'react';
import { useExamPaper } from '@hooks/useExamPaper';
import { Header } from './components/Header';
import { Question } from './components/Question';
import { Options } from './components/Options';
import Taro from '@tarojs/taro';
import { paperLevelMap } from './constant';

function Index() {
  const params = Taro.getCurrentInstance().router?.params as any;
  const level = params?.level;

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const {
    handbookData: { items },
  } = useHandBookData();

  const {
    examPaper: { userAnswerList, topicList, examRawData },
    updateSingleExamPaperState,
  } = useExamPaper();

  // 当前选中的
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (!items?.length || !level) return;
    const { stageMap, sort } = paperLevelMap[String(level)];
    const newTopicList = paperGenerator({
      items,
      topicMetaList: examRawData.item,
      stageMap,
      sort,
    });
    updateSingleExamPaperState('topicList', newTopicList);
    console.log('生成试卷', newTopicList);
  }, [items]);

  // 用户当前在答第几题
  const curIndex = useMemo(() => userAnswerList.length + 1, [userAnswerList]);

  // 当前已经完成了答题
  const isFinished = useMemo(
    () => curIndex > topicList.length && topicList.length > 0,
    [curIndex, topicList],
  );

  useEffect(() => {
    if (!isFinished) return;
    // 完成后，清空当前页面并跳转到结果页
    Taro.redirectTo({
      url: `/pages/paper-result/index?level=${level}`,
    });
  }, [isFinished]);

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
      >
        {!isFinished && (
          <>
            <Header curIndex={curIndex} selected={selected} />
            <Question topic={topicList[curIndex - 1]} />
            <Options
              curIndex={curIndex}
              selected={selected}
              setSelected={setSelected}
            />
          </>
        )}
      </View>
    </ErrorBoundary>
  );
}

export default Index;
