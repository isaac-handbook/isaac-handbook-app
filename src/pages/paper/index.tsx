import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { useHandBookData } from '@hooks/useHandbookData';
import { commonPaperGenerator } from '@pages/paper/utils/paper/commonPaperGenerator';
import { useEffect, useMemo, useState } from 'react';
import { useExamPaper } from '@hooks/useExamPaper';
import { Header } from './components/Header';
import { Question } from './components/Question';
import { Options } from './components/Options';
import Taro from '@tarojs/taro';
import { paperLevelMap } from './constant';
import { Topic } from '@typers/exam';
import { endlessPaperGenerator } from './utils/paper/endlessPaperGenerator';

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
    examPaper: { currentTopicIndex, topicList, examRawData },
    updateSingleExamPaperState,
  } = useExamPaper();

  // 当前选中的
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (!items?.length || !level) return;
    let newTopicList: Topic[] = [];
    if (level === '999') {
      // 生成无尽模式试卷
      newTopicList = endlessPaperGenerator({
        items,
        topicMetaList: examRawData.item,
        stageList: [1, 2, 3],
      });
    } else {
      // 生成普通模式试卷
      const { stageMap, sort } = paperLevelMap[String(level)];
      newTopicList = commonPaperGenerator({
        items,
        topicMetaList: examRawData.item,
        stageMap,
        sort,
      });
    }

    updateSingleExamPaperState('topicList', newTopicList);
    console.log('生成试卷', newTopicList);
  }, [items]);

  // 用户当前在答第几题
  // const curIndex = useMemo(() => userAnswerList.length + 1, [userAnswerList]);

  // 当前已经完成了答题
  const isFinished = useMemo(
    () => currentTopicIndex > topicList.length && topicList.length > 0,
    [currentTopicIndex, topicList],
  );

  useEffect(() => {
    if (!isFinished) return;
    // 完成后，清空当前页面并跳转到结果页
    Taro.redirectTo({
      url: `/pages/paper-result/index?level=${level}`,
    });
  }, [isFinished]);

  const relex = level === '999';

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
            <Header selected={selected} relex={relex} />
            <Question
              topic={topicList[currentTopicIndex - 1]}
              linkable={relex}
              relex={relex}
            />
            <Options
              selected={selected}
              setSelected={setSelected}
              relex={relex}
            />
          </>
        )}
      </View>
    </ErrorBoundary>
  );
}

export default Index;
