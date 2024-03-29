import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { Chara, Curse, Item, ItemDetailNode } from 'src/types/handbook';
import classNames from 'classnames';
import { ContentTransformer } from '@components/ContentTransformer';
import { useRecoilState } from 'recoil';
import { themeInfoState } from '@hooks/useThemeInfo';
import { Dot } from '@components/Dot';
import { convertTagToSuit } from '@pages/index/components/ItemFilter/TagFilter';
import { LinkText } from '@components/LinkText';
import { getItemWikiLink } from '@utils/wiki';

interface Props {
  item: Item | Chara | Curse;
}

export const DetailContent: React.FC<Props> = (props) => {
  const { item: curItem } = props;
  const [{ themeColor }] = useRecoilState(themeInfoState);

  console.log(curItem.nameZh);

  if (!curItem) {
    return null;
  }

  // 递归渲染所有 value 和 children
  const renderSections = (item: ItemDetailNode) => {
    if (item.level === 0 && !item.children?.length) {
      return null;
    }
    const value = item.value ?? '效果';
    return (
      <View
        className={classNames(styles.section, styles[`section-${item.level}`])}
      >
        <View
          className={classNames(styles.value, styles[`value-${item.level}`], {
            [styles.subTitle]: item.extra?.includes('subTitle'),
          })}
        >
          <Dot level={item.level} themeColor={themeColor} value={value} />
          <ContentTransformer
            id={curItem.id}
            value={value}
            nameZh={curItem.nameZh}
            type={curItem.type}
          />
        </View>
        {item.children && item.children?.map((child) => renderSections(child))}
      </View>
    );
  };

  const renderSingleModule = (title: string, contents: React.ReactNode[]) => {
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
                  type={curItem.type}
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
      {/* {curItem.type === 'chara' &&
        renderSingleModule('可解锁物品', [`{{charaUnlock|${curItem.nameZh}}}`])} */}
      {curItem.description &&
        renderSingleModule('简介', [
          curItem.description,
          curSuit && `可作为{{suit|${curSuit}}}的组成部分。`,
        ])}
      {curItem.content?.map((cell, index) => {
        return (
          <View key={`${cell.value}_${index}`} className={styles.module}>
            {renderSections(cell)}
          </View>
        );
      })}
      {renderSingleModule('其他', [
        curItem.alias?.length ? `民间叫法：${curItem.alias.join('、')}` : '',
        curItem.nameEn ? `英文名称：${curItem.nameEn}` : '',
        curItem.descEn ? `英文描述：${curItem.descEn}` : '',
        <LinkText
          value="点击复制 WIKI 链接"
          action="copy"
          copyValue={getItemWikiLink(curItem)}
        />,
      ])}
    </View>
  );
};
