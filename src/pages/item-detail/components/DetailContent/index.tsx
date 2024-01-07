import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Chara, HandBookData, Item, ItemType } from 'src/types/handbook';
import classNames from 'classnames';
import { ContentTransformer } from '@components/ContentTransformer';
import { useRecoilState } from 'recoil';
import { themeInfoState } from '@hooks/useThemeInfo';
import { Dot } from '@components/Dot';
import { convertTagToSuit } from '@pages/index/components/ItemFilter/TagFilter';

interface Props {
  item: Item | Chara;
  handbookData: HandBookData;
  type: ItemType;
}

export const DetailContent: React.FC<Props> = (props) => {
  const { item: curItem } = props;
  const [{ themeColor }] = useRecoilState(themeInfoState);

  if (!curItem) {
    return null;
  }

  // 递归渲染所有 value 和 children
  const renderSections = (item: Item['content'][0]) => {
    if (item.level === 0 && !item.children.length) {
      return null;
    }
    return (
      <View
        className={classNames(styles.section, styles[`section-${item.level}`])}
      >
        <View
          className={classNames(styles.value, styles[`value-${item.level}`], {
            [styles.subTitle]: item.extra?.includes('subTitle'),
          })}
        >
          <Dot level={item.level} themeColor={themeColor} value={item.value} />
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
                <Dot level={1} themeColor={themeColor} />
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

  let curSuit = '';
  // 看一下tag里面有没有套装
  curItem.tags?.forEach((tag) => {
    if (convertTagToSuit[tag]) {
      curSuit = tag;
    }
  });

  return (
    <View className={styles.container}>
      {props.type === 'chara' &&
        renderSingleModule('可解锁物品', [`{{charaUnlock|${curItem.nameZh}}}`])}
      {curItem.description &&
        renderSingleModule('简介', [
          curItem.description,
          curSuit && `可作为{{suit|${curSuit}}}的组成部分。`,
        ])}
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
        renderSingleModule('其他名称', [
          curItem.alias?.length ? `民间叫法：${curItem.alias.join('、')}` : '',
          `英文名称：${curItem.nameEn}`,
          curItem.descEn ? `英文描述：${curItem.descEn}` : '',
        ])}
    </View>
  );
};
