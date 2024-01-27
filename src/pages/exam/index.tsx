import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import Taro from '@tarojs/taro';
import { ArrowSize6 } from '@nutui/icons-react-taro';
import { useAsyncEffect } from 'ahooks';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const handleStartExam = (level: number) => {
    // 跳转到 paper 页面
    Taro.navigateTo({
      url: `/pages/paper/index?level=${level}`,
    });
  };

  useAsyncEffect(async () => {
    // 获取用户当前的 openid
    const openid = await Taro.cloud.callFunction({
      name: 'login',
    });
    console.log('openid', openid);
    const db = Taro.cloud.database();
    const col = db.collection('score-level-1');
    const data = await col.get();
    console.log('data', data);
    // 插入一条数据
    await col.add({
      data: {
        name: '张三',
        score: 100,
      },
    });

    const update = await col.get();
    console.log('update', update);
  }, []);

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.gridColor,
          color: themeColor.textColor,
        }}
      >
        <View
          className={styles.navItem}
          style={{ backgroundColor: themeColor.bgColor }}
          onClick={() => handleStartExam(1)}
        >
          <View
            className={styles.left}
            style={{
              backgroundColor: themeColor.gridColor,
            }}
          >
            <Image
              className={styles.icon}
              src={require('../../assets/chara/以撒.png')}
            />
          </View>
          <View className={styles.content}>
            <View className={styles.title}>
              <View className={styles.name}>简单卷</View>
              <View className={styles.score}>我的分数：100分</View>
            </View>
            <View className={styles.desc}>20道题，证明你玩过以撒</View>
          </View>
          <View className={styles.right}>
            <ArrowSize6 size={16} />
          </View>
        </View>

        <View
          className={styles.navItem}
          style={{ backgroundColor: themeColor.bgColor }}
          onClick={() => handleStartExam(2)}
        >
          <View
            className={styles.left}
            style={{
              backgroundColor: themeColor.gridColor,
            }}
          >
            <Image
              className={styles.icon}
              src={require('../../assets/chara/堕化以撒.png')}
            />
          </View>
          <View className={styles.content}>
            <View className={styles.title}>
              <View className={styles.name}>普通卷</View>
              <View className={styles.score}>我的分数：100分</View>
            </View>
            <View className={styles.desc}>20道题，证明你有游戏理解</View>
          </View>
          <View className={styles.right}>
            <ArrowSize6 size={16} />
          </View>
        </View>

        <View
          className={styles.navItem}
          style={{ backgroundColor: themeColor.bgColor }}
          onClick={() => handleStartExam(3)}
        >
          <View
            className={styles.left}
            style={{
              backgroundColor: themeColor.gridColor,
            }}
          >
            <Image
              className={styles.icon}
              src={require('../../assets/chara/游魂.png')}
            />
          </View>
          <View className={styles.content}>
            <View className={styles.title}>
              <View className={styles.name}>困难卷</View>
              <View className={styles.score}>我的分数：100分</View>
            </View>
            <View className={styles.desc}>20道题，证明你是资深大佬</View>
          </View>
          <View className={styles.right}>
            <ArrowSize6 size={16} />
          </View>
        </View>

        <View
          className={styles.navItem}
          style={{ backgroundColor: themeColor.bgColor }}
          onClick={() => handleStartExam(100)}
        >
          <View
            className={styles.left}
            style={{
              backgroundColor: themeColor.gridColor,
            }}
          >
            <Image
              className={styles.icon}
              src={require('../../assets/chara/堕化游魂.png')}
            />
          </View>
          <View className={styles.content}>
            <View className={styles.title}>
              <View className={styles.name}>勇者卷</View>
              <View className={styles.score}>我的分数：100分</View>
            </View>
            <View className={styles.desc}>100道题，真正的挑战</View>
          </View>
          <View className={styles.right}>
            <ArrowSize6 size={16} />
          </View>
        </View>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
