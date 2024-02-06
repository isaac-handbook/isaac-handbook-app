import { themeInfoState } from '@hooks/useThemeInfo';
import { Empty } from '@nutui/nutui-react-taro';
import { Button, View } from '@tarojs/components';
import { forceReload } from '@utils/forceReload';
import { useRecoilState } from 'recoil';
import styles from './index.module.scss';

function ErrorPage() {
  const [{ themeColor }] = useRecoilState(themeInfoState);

  return (
    <View
      style={{
        backgroundColor: themeColor.bgColor,
        color: themeColor.textColor,
      }}
      className={styles.page}
    >
      <Empty
        status="error"
        description="加载中"
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
          opacity: '1',
        }}
      >
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
            点我清理缓存并重试
          </Button>
          <Button openType="feedback" type="default" size="mini">
            点我联系开发者反馈
          </Button>
        </div>
      </Empty>
    </View>
  );
}

export default ErrorPage;
