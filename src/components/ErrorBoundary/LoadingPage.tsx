import { themeInfoState } from '@hooks/useThemeInfo';
import { Empty } from '@nutui/nutui-react-taro';
import { Button, View } from '@tarojs/components';
import { forceReload } from '@utils/forceReload';
import { useRecoilState } from 'recoil';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';

function LoadingPage() {
  const [{ themeColor }] = useRecoilState(themeInfoState);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setContentVisible(true);
    }, 1000);
  }, []);

  return (
    <View
      style={{
        backgroundColor: themeColor.bgColor,
        color: themeColor.textColor,
      }}
      className={styles.page}
    >
      {contentVisible && (
        <Empty
          status="error"
          description="加载中"
          style={{
            backgroundColor: themeColor.bgColor,
            color: themeColor.textColor,
            opacity: '0.8',
          }}
        >
          <div style={{ marginTop: '36px' }}>
            <Button onClick={forceReload} type="default" size="mini">
              长时间没有反应？点我进行数据更新。
            </Button>
          </div>
        </Empty>
      )}
    </View>
  );
}

export default LoadingPage;
