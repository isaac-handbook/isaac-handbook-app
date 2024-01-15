import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import changeLog from './assets/changeLog.json';
import { LinkText } from '@components/LinkText';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

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
          <LinkText
            value="以撒的结合中文维基"
            action="copy"
            copyValue="https://isaac.huijiwiki.com"
          />
          。协议许可：
          <LinkText
            value="CC BY-NC-SA 3.0"
            action="copy"
            copyValue="https://creativecommons.org/licenses/by-nc-sa/3.0/deed.zh-hans"
          />
          。
        </View>
        <View className={styles.p}>
          本项目以个人学习为目的而创立，不作商业用途。遵从
          <LinkText
            value="Apache License 2.0"
            action="copy"
            copyValue="https://github.com/isaac-handbook/isaac-handbook-app/blob/main/LICENSE"
          />
          进行开源。
          <LinkText
            value="点击复制开源仓库地址"
            action="copy"
            copyValue="https://github.com/isaac-handbook/isaac-handbook-app"
          />
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
