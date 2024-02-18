import { ReactNode, useEffect } from 'react';
// 全局样式
import './app.scss';
import { RecoilRoot } from 'recoil';
import Taro from '@tarojs/taro';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/katex.wxss';
import { checkMiniUpdate } from '@utils/checkMiniUpdate';

interface AppProps {
  children: ReactNode;
}

function App(props: AppProps) {
  useEffect(() => {
    // 初始化
    Taro.cloud.init({
      env: 'isaac-handbook-6gfcp1zy588edf1a',
    });
    // 检查更新
    checkMiniUpdate();
    setInterval(() => {
      checkMiniUpdate();
    }, 60000);
  }, []);

  return (
    <ErrorBoundary>
      <RecoilRoot>{props.children}</RecoilRoot>
    </ErrorBoundary>
  );
}

export default App;
