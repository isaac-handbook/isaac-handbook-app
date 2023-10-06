import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ScrollView, View } from '@tarojs/components';

interface VirtualListProps {
  data: any[];
  itemHeight: number;
  preloadHeight: number;
  renderRow: (item: any, index: number) => JSX.Element;
  loadHeight: number;
  paddingTop?: string;
}

export interface VirtualListRef {
  setScrollTop: (scrollTop: number) => void;
}

const VirtualList = forwardRef<VirtualListRef, VirtualListProps>(
  (props, ref) => {
    const {
      data,
      itemHeight,
      preloadHeight,
      renderRow,
      loadHeight,
      paddingTop,
    } = props;
    const [startOffset, setStartOffset] = useState(0);
    const [visibleData, setVisibleData] = useState<any[]>([]);

    const handleScroll = (e: any) => {
      let scrollTop = e.detail.scrollTop - preloadHeight;
      if (scrollTop < 0) {
        scrollTop = 0;
      }
      const start = Math.floor(scrollTop / itemHeight);
      const end = start + Math.ceil(loadHeight / itemHeight);
      setStartOffset(start * itemHeight);
      setVisibleData(data.slice(start, end + 1));
    };

    useEffect(() => {
      setVisibleData(data.slice(0, Math.ceil(loadHeight / itemHeight)));
    }, [data, loadHeight, itemHeight]);

    const [scrollTop, setScrollTop] = useState(0);

    useImperativeHandle(ref, () => ({
      setScrollTop,
    }));

    return (
      <ScrollView
        scrollY
        enablePassive
        onScroll={handleScroll}
        scrollTop={scrollTop}
        style={{
          height: `100vh`,
          paddingTop,
          overflowY: 'auto',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            height: `${data.length * itemHeight}px`,
          }}
        />
        {visibleData.map((item, index) => (
          <View
            key={index}
            style={{
              position: 'absolute',
              top: `${startOffset + index * itemHeight}px`,
              height: `${itemHeight}px`,
              width: '100%',
            }}
          >
            {renderRow(item, index)}
          </View>
        ))}
      </ScrollView>
    );
  },
);

export default VirtualList;
