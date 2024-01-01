import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { ContentTransformer } from '@components/ContentTransformer';
import { Table } from '@components/Table';
import { useHandBookData } from '@hooks/useHandbookData';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const { handbookData } = useHandBookData();

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
