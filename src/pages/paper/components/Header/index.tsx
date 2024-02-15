import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useExamPaper } from '@hooks/useExamPaper';
import { Progress } from '@nutui/nutui-react-taro';
import { useThemeInfo } from '@hooks/useThemeInfo';

// 做题时间，单位s
const timeout = 20;

interface Props {
  selected: number | null;
  relex: boolean;
}

export const Header: React.FC<Props> = (props) => {
  const { selected, relex } = props;
  const {
    examPaper: { topicList, currentTopicIndex },
    submitSingleTopic,
  } = useExamPaper();

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const countdownRef = React.useRef<any>(null);
  const [countdown, setCountdown] = React.useState(0);

  useEffect(() => {
    if (relex) {
      // 娱乐模式没有倒计时
      return;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    // 初始化一个计时器
    setCountdown(0);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => prev + 1);
    }, 1000);
  }, [currentTopicIndex, relex]);

  useEffect(() => {
    if (relex) {
      // 娱乐模式没有倒计时
      return;
    }
    if (countdown > timeout) {
      // 超时，自动提交
      setCountdown(0);
      submitSingleTopic(selected ?? null);
    }
  }, [countdown, relex]);

  const warning = countdown > timeout - 5;

  return (
    <View className={styles.container}>
      <View className={styles.top}>
        <View className={styles.counter}>
          问题
          <View className={styles.number}>
            {currentTopicIndex}/{topicList.length}
          </View>
        </View>
        <View className={styles.countdown}>
          {relex ? (
            <>提示：道具可点击</>
          ) : (
            <>
              本题倒计时
              <View
                className={styles.number}
                style={{
                  color: warning ? themeColor.errorColor : 'inherit',
                }}
              >
                {timeout - countdown}s
              </View>
            </>
          )}
        </View>
      </View>
      <View className={styles.progress}>
        <Progress
          percent={(currentTopicIndex / topicList.length) * 100}
          color={`linear-gradient(270deg, #fc4a1a 0%,${themeColor.primaryColor} 100%)`}
          // animated
        />
      </View>
    </View>
  );
};
