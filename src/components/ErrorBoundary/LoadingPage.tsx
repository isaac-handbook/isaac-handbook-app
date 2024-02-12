import { themeInfoState } from '@hooks/useThemeInfo';
import { Empty } from '@nutui/nutui-react-taro';
import { Button, View } from '@tarojs/components';
import { forceReload } from '@utils/forceReload';
import { useRecoilState } from 'recoil';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';

interface Props {
  type?: 'canRefresh' | 'custom';
  children?: React.ReactNode;
}

const LoadingPage: React.FC<Props> = (props) => {
  const { type = 'canRefresh', children = '' } = props;
  const [{ themeColor }] = useRecoilState(themeInfoState);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setContentVisible(true);
    }, 1000);
  }, []);

  const renderContent = () => {
    if (type === 'canRefresh') {
      return (
        <div
          style={{
            marginTop: '36px',
            opacity: '0.5',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button
            style={{ marginBottom: '36rpx' }}
            onClick={forceReload}
            type="default"
            size="mini"
          >
            长时间没有反应？点我清理缓存并重试
          </Button>
          <Button openType="feedback" type="default" size="mini">
            点我联系开发者反馈
          </Button>
        </div>
      );
    }
    return children;
  };

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
          description="..."
          style={{
            backgroundColor: themeColor.bgColor,
            color: themeColor.textColor,
            opacity: '0.9',
          }}
        >
          <div style={{ marginTop: '36px' }}>{renderContent()}</div>
        </Empty>
      )}
    </View>
  );
};

export default LoadingPage;
