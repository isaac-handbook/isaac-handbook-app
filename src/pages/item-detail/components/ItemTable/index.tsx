import React from 'react';
import { ContentTransformer } from '@components/ContentTransformer';
import { ItemType } from 'src/types/handbook';
import { Table } from '@nutui/nutui-react-taro';
import { useRecoilState } from 'recoil';
import { handbookDataState } from '@hooks/useHandbookData';
import { themeInfoState } from '@hooks/useThemeInfo';

interface Props {
  type?: ItemType;
  id?: string;
  nameZh?: string;
}

export const ItemTable: React.FC<Props> = (props) => {
  const { type } = props;

  const [handbookData] = useRecoilState(handbookDataState);
  const [{ themeColor }] = useRecoilState(themeInfoState);

  // 判断当前物品是否需要渲染table
  const tableName = type + '|' + (type === 'chara' ? props.nameZh : props.id);
  const hasTable = Object.keys(handbookData.extra.table).includes(tableName);

  console.log(tableName);
  console.log(hasTable);

  if (!hasTable) {
    return null;
  }

  return (
    <Table
      columns={handbookData.extra.table[tableName].columns.map((column) => ({
        ...column,
        render: (value: any) => (
          <ContentTransformer
            value={value[column.key]}
            id={props.id}
            nameZh={props.nameZh}
            lineHeight={'45rpx'}
          />
        ),
      }))}
      data={handbookData.extra.table[tableName].data}
      style={
        {
          '--nutui-table-border-color': themeColor.gridBorderColor,
          color: themeColor.textColor,
          marginBottom: '32rpx',
        } as any
      }
    />
  );
};
