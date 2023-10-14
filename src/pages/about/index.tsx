import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import classNames from 'classnames';
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
          移动端以撒图鉴，专注于移动便携体验。数据主要来源于：
          <View className={styles.inline} onClick={copyWikiUrl}>
            以撒的结合中文维基
          </View>
        </View>
        <View className={styles.p}>
          本项目以个人学习、方便玩家为目的而创建，不作任何商业用途。
        </View>
        <View className={styles.p}>
          本项目遵从
          <View className={styles.inline} onClick={copyRuleUrl}>
            MIT协议
          </View>
          进行开源，欢迎大家提出问题或建议，一起参与建设。
        </View>
        <View
          className={classNames(styles.p, styles.inline)}
          onClick={copyCodeUrl}
        >
          开源仓库地址
        </View>
        <View className={styles.changeLog}>
          <View className={styles.changeTitle}>更新记录</View>
          {changeLog.changeLog.map((item, index) => (
            <View key={index} className={styles.changeLine}>
              <View className={styles.changeDate}>{item.date}</View>
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
