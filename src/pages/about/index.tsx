import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import Taro from '@tarojs/taro';
import changeLog from './assets/changeLog.json';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const copyUrl = (url: string) => {
    Taro.setClipboardData({
      data: url,
      success: () => {
        Taro.showToast({
          title: '链接已复制',
          icon: 'success',
          duration: 1000,
        });
      },
    });
  };

  const copyWikiUrl = () => copyUrl('https://isaac.huijiwiki.com/');

  const copyCodeUrl = () =>
    copyUrl('https://github.com/isaac-handbook/isaac-handbook-app');

  const copyRuleUrl = () =>
    copyUrl(
      'https://github.com/isaac-handbook/isaac-handbook-app/blob/main/LICENSE',
    );

  const copyCcUrl = () =>
    copyUrl('https://creativecommons.org/licenses/by-nc-sa/3.0/deed.zh-hans');

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
      >
        <View className={styles.p}>
          移动端以撒图鉴，专注于移动便携体验。数据部分来源于：
          <View className={styles.inline} onClick={copyWikiUrl}>
            以撒的结合中文维基
          </View>
          。协议许可：
          <View className={styles.inline} onClick={copyCcUrl}>
            CC BY-NC-SA 3.0
          </View>
          。在此基础上进行二次创作。
        </View>
        <View className={styles.p}>
          本项目以个人学习为目的而创立，不作商业用途。遵从
          <View className={styles.inline} onClick={copyRuleUrl}>
            Apache License 2.0协议
          </View>
          进行开源。
          <View className={styles.inline} onClick={copyCodeUrl}>
            点击复制开源仓库地址
          </View>
          。
        </View>
        <View className={styles.changeLog}>
          <View className={styles.changeTitle}>更新记录</View>
          {changeLog.changeLog
            .slice()
            .reverse()
            .map((item, index) => (
              <View key={index} className={styles.changeLine}>
                <View className={styles.title}>
                  <View className={styles.version}>{item.version}</View>
                  <View className={styles.date}>{item.date}</View>
                </View>
                <View className={styles.changeContent}>
                  {item.changes.map((change, index) => (
                    <View key={index} className={styles.changeItem}>
                      {change}
                    </View>
                  ))}
                </View>
              </View>
            ))}
        </View>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
