import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { Table } from '@nutui/nutui-react-taro';
import { ContentTransformer } from '@components/ContentTransformer';
import { handbookDataState } from '@hooks/useHandbookData';
import { useRecoilState } from 'recoil';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const [handbookData] = useRecoilState(handbookDataState);

  console.log(handbookData.extra.bossMark);

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
      >
        <Table
          columns={handbookData.extra.bossMark.columns.map((column) => ({
            ...column,
            render: (value: any) => (
              <ContentTransformer
                value={value[column.key]}
                lineHeight={'45rpx'}
              />
            ),
          }))}
          data={handbookData.extra.bossMark.data}
          style={
            {
              '--nutui-table-border-color': themeColor.gridBorderColor,
              color: themeColor.textColor,
              marginBottom: '32rpx',
            } as any
          }
        />
      </View>
    </ErrorBoundary>
  );
}

export default Index;
