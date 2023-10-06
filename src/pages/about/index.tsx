import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import classNames from 'classnames';
import Taro from '@tarojs/taro';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const copyWikiUrl = () => {
    Taro.setClipboardData({
      data: 'https://isaac.huijiwiki.com/',
      success: () => {
        Taro.showToast({
          title: '链接已复制',
          icon: 'success',
          duration: 1000,
        });
      },
    });
  };

  const copyCodeUrl = () => {
    Taro.setClipboardData({
      data: 'https://github.com/isaac-handbook/isaac-handbook-app',
      success: () => {
        Taro.showToast({
          title: '链接已复制',
          icon: 'success',
          duration: 1000,
        });
      },
    });
  };

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
          本项目遵从 MIT协议 进行开源，欢迎大家提出建议和意见，或一起参与建设。
        </View>
        <View
          className={classNames(styles.p, styles.inline)}
          onClick={copyCodeUrl}
        >
          开源仓库地址
        </View>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
