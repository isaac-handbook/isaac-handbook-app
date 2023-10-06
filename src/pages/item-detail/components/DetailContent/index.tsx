import React, { CSSProperties } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { HandBookData, Item, ItemType } from 'src/types/handbook';
import classNames from 'classnames';
import { ContentTransformer } from '@components/ContentTransformer';
import { useRecoilState } from 'recoil';
import { themeInfoState } from '@hooks/useThemeInfo';

interface Props {
  item: Item;
  handbookData: HandBookData;
  type: ItemType;
}

export const DetailContent: React.FC<Props> = (props) => {
  const { item: curItem } = props;
  const [{ themeColor }] = useRecoilState(themeInfoState);
  // 渲染最左边的点
  const renderDot = (level: number, value: string = '') => {
    if (level === 0) {
      return null;
    }
    if (value === '{{table}}') {
      return null;
    }
    let dotType = 1;
    if ((level - 1) % 3 === 0) {
      dotType = 1;
    } else if ((level - 1) % 3 === 1) {
      dotType = 2;
    } else {
      dotType = 3;
    }
    const dotStyle: CSSProperties = {
      marginLeft: `${(level - 1) * 30}rpx`,
      backgroundColor: dotType === 2 ? 'transparent' : themeColor.textColor,
      borderColor: themeColor.textColor,
    };
    return <View className={styles[`dot-${dotType}`]} style={dotStyle}></View>;
  };

  // 递归渲染所有 value 和 children
  const renderSections = (item: Item['content'][0]) => {
    return (
      <View
        className={classNames(styles.section, styles[`section-${item.level}`])}
      >
        <View
          className={classNames(styles.value, styles[`value-${item.level}`])}
        >
          <View className={styles.dotWrapper}>
            {renderDot(item.level, item.value)}
          </View>
          <ContentTransformer
            id={curItem.id}
            value={item.value}
            nameZh={curItem.nameZh}
            type={props.type}
          />
        </View>
        {item.children && item.children.map((child) => renderSections(child))}
      </View>
    );
  };

  const renderSingleModule = (title: string, contents: string[]) => {
    if (!contents.length) {
      return null;
    }
    return (
      <View className={styles.module}>
        <View className={classNames(styles.section, styles[`section-0`])}>
          <View className={classNames(styles.value, styles[`value-0`])}>
            {title}
          </View>
        </View>
        <View className={classNames(styles.section, styles[`section-1`])}>
          {contents.map((content) => {
            if (!content) {
              return null;
            }
            return (
              <View className={classNames(styles.value, styles[`value-1`])}>
                <View className={styles.dotWrapper}>{renderDot(1)}</View>
                <ContentTransformer
                  id={curItem.id}
                  value={content}
                  nameZh={curItem.nameZh}
                  type={props.type}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View className={styles.container}>
      {curItem.description && renderSingleModule('简介', [curItem.description])}
      {curItem.content.map((cell) => {
        if (!cell.value) {
          return null;
        }
        return (
          <View key={cell.value} className={styles.module}>
            {renderSections(cell)}
          </View>
        );
      })}
      {(curItem.nameEn || curItem.descEn) &&
        renderSingleModule('英文', [
          `名称：${curItem.nameEn}`,
          curItem.descEn ? `描述：${curItem.descEn}` : '',
        ])}
    </View>
  );
};
