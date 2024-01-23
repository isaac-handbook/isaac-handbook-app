import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useExamPaper } from '@hooks/useExamPaper';
import { Progress } from '@nutui/nutui-react-taro';

// 做题时间，单位s
const timeout = 20;

interface Props {
  curIndex: number;
}

export const Header: React.FC<Props> = (props) => {
  const { curIndex } = props;
  const {
    examPaper: { topicList },
    submitWhitePaper,
  } = useExamPaper();

  const countdownRef = React.useRef<any>(null);
  const [countdown, setCountdown] = React.useState(0);

  useEffect(() => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    // 初始化一个计时器
    setCountdown(0);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => prev + 1);
    }, 1000);
  }, [curIndex]);

  useEffect(() => {
    if (countdown > timeout) {
      // 超时，自动提交
      setCountdown(0);
      submitWhitePaper();
    }
  }, [countdown]);

  const warning = countdown > timeout - 5;

  return (
    <View className={styles.container}>
      <View className={styles.top}>
        <View className={styles.counter}>
          问题
          <View className={styles.number}>
            {curIndex}/{topicList.length}
          </View>
        </View>
        <View className={styles.countdown}>
          本题倒计时
          <View
            className={styles.number}
            style={{
              color: warning ? '#ff4d4f' : 'inherit',
            }}
          >
            {timeout - countdown}s
          </View>
        </View>
      </View>
      <View className={styles.progress}>
        <Progress
          percent={(curIndex / topicList.length) * 100}
          color="linear-gradient(270deg, #fc4a1a 0%,#f7b733 100%)"
          // animated
        />
      </View>
    </View>
  );
};
