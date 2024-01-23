import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { Button } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const handleStartExam = () => {
    // 跳转到 paper 页面
    Taro.navigateTo({
      url: '/pages/paper/index',
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
        <Button size="large" type="primary" onClick={handleStartExam}>
          开始答题
        </Button>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
