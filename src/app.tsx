import { ReactNode, useEffect } from 'react';
import { useDidShow, useDidHide } from '@tarojs/taro';
// 全局样式
import './app.scss';
import { RecoilRoot } from 'recoil';
import Taro from '@tarojs/taro';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/katex.wxss';

interface AppProps {
  children: ReactNode;
}

function App(props: AppProps) {
  // 可以使用所有的 React Hooks
  useEffect(() => {
    Taro.cloud.init({
      env: 'isaac-handbook-6gfcp1zy588edf1a',
    });
  }, []);

  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});

  return (
    <ErrorBoundary>
      <RecoilRoot>{props.children}</RecoilRoot>
    </ErrorBoundary>
  );
}

export default App;
