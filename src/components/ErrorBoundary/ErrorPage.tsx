import { Empty } from '@nutui/nutui-react-taro';
import { Button } from '@tarojs/components';
import { forceReload } from '@utils/forceReload';

function ErrorPage() {
  return (
    <Empty status="error" description="加载失败">
      <div style={{ marginTop: '36px' }}>
        <Button onClick={forceReload} type="primary">
          清理缓存并重试
        </Button>
      </div>
    </Empty>
  );
}

export default ErrorPage;
