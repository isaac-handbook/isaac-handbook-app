import React, { memo, useEffect } from 'react';
import { ScrollView, View } from '@tarojs/components';
import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
  height?: string;
  bottomLoading?: boolean;
  finished?: boolean;
  onScrollToLower?: () => void;
}

const Cell: React.FC<Props> = (props) => {
  const { children, height = '100vh', bottomLoading, finished } = props;

  const observerRef = React.useRef<any>();
  const scrollRef = React.useRef<any>();
  const contrastRef = React.useRef<any>();

  const scroll = async (e) => {
    // 当前必须是向下滑动
    if (e.detail.deltaY >= 0) return;
    // 对比一下，是否触底
    const observer = await observerRef.current.getBoundingClientRect();
    const contrast = await contrastRef.current.getBoundingClientRect();

    if (observer.top - 40 <= contrast.top) {
      props.onScrollToLower && props.onScrollToLower();
    }
  };

  useEffect(() => {
    const element = scrollRef.current;
    element.addEventListener('scroll', scroll, false);
    return () => {
      element.removeEventListener('scroll', scroll, false);
    };
  }, []);

  return (
    <View className={styles.container} style={{ height }}>
      <ScrollView
        ref={scrollRef}
        scrollY
        style={{ height }}
        className={styles.scroll}
      >
        {children}
        <View ref={observerRef} className={styles.observer}></View>
        <View className={styles.scrollBottom}>
          {finished && <View>————我是有底线的————</View>}
          {bottomLoading && <View>加载中...</View>}
        </View>
      </ScrollView>
      <View ref={contrastRef} className={styles.contrast}></View>
    </View>
  );
};

export const ScrollList = memo(Cell);
