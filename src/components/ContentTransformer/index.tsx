import React from 'react';
import { View, Image, RichText } from '@tarojs/components';
import styles from './index.module.scss';
import { InlineItem } from '@components/InlineItem';
import parse from '@rojer/katex-mini';
import { StuffIcon } from '@components/StuffIcon';
import { stuffIconPositionMap } from '@constants';
import { ItemGridDrawer } from '@components/ItemGridDrawer';
import { EntityIcon } from '@components/EntityIcon';
import { themeInfoState } from '@hooks/useThemeInfo';
import { useRecoilState } from 'recoil';
import { ReviveDrawer } from '@components/ReviveDrawer';
import { useHandBookData } from '@hooks/useHandbookData';
import { ItemTable } from '@pages/item-detail/components/ItemTable';
import { ItemType } from 'src/types/handbook';
import { convertTagToSuit } from '@pages/index/components/ItemFilter/TagFilter';
import { formatCharaName, unFormatCharaName } from '@utils/formatCharaName';
import { CharaUnlockDrawer } from '@components/CharaUnlockDrawer';
import { ThemeColor } from '@hooks/useThemeInfo/style';

interface Props {
  id?: string;
  nameZh?: string;
  value: string;
  lineHeight?: string;
  type?: ItemType;
  mathFontSize?: string;
  mode?: 'clean' | 'normal';
  lockTheme?: ThemeColor;
}

export const ContentTransformer: React.FC<Props> = (props) => {
  const {
    nameZh,
    lineHeight = '60rpx',
    mathFontSize,
    mode = 'normal',
    lockTheme,
  } = props;

  const [{ themeColor: themeColor_ }] = useRecoilState(themeInfoState);

  const themeColor = lockTheme ?? themeColor_;

  const { handbookData } = useHandBookData();

  // 从handbookData的items中获取对应的数据
  const getItemData = (target: string) => {
    // 如果是ID=c开头，说明要匹配道具的id
    if (target.startsWith('ID=c')) {
      const item = handbookData.items.find(
        (item) => item.id === target.replace('ID=c', ''),
      );
      if (!item) {
        return null;
      }
      return item;
    }
    // 如果是ID=t开头，说明要匹配饰品的id
    if (target.startsWith('ID=t')) {
      const trinket = handbookData.trinkets.find(
        (trinket) => trinket.id === target.replace('ID=t', ''),
      );
      if (!trinket) {
        return null;
      }
      return trinket;
    }
    // 如果是ID=p开头，说明要匹配胶囊的id
    if (target.startsWith('ID=p')) {
      const pill = handbookData.pills.find(
        (pill) => pill.id === target.replace('ID=p', ''),
      );
      if (!pill) {
        return null;
      }
      return pill;
    }
    // 如果是ID=k开头，说明要匹配卡牌的id
    if (target.startsWith('ID=k')) {
      const card = handbookData.cards.find(
        (card) => card.id === target.replace('ID=k', ''),
      );
      if (!card) {
        return null;
      }
      return card;
    }
    // 不是c开头，匹配nameZh
    // 匹配道具
    const item = handbookData.items.find((item) => item.nameZh === target);
    if (item) return item;
    // 匹配饰品
    const trinket = handbookData.trinkets.find(
      (trinket) => trinket.nameZh === target,
    );
    if (trinket) return trinket;
    // 匹配卡牌
    const card = handbookData.cards.find((card) => card.nameZh === target);
    if (card) return card;
    // 匹配胶囊
    const pill = handbookData.pills.find((pill) => pill.nameZh === target);
    if (pill) return pill;

    if (props.type === 'chara') {
      return handbookData.chara[target];
    }

    return null;
  };

  // 转换value中的{{}}为对应的数据
  const transformInnerData = (data: string) => {
    if (mode === 'clean') {
      console.log('clean', data);
      if (data.includes('|')) {
        return data.split('|')[1];
      }
      return data;
    }
    switch (data) {
      case '不叠加':
        return `多个${nameZh}的效果不叠加`;
      case '射速':
        return (
          <Image className={styles.icon} src={require('@assets/射速.png')} />
        );
      case '射程':
        return (
          <Image className={styles.icon} src={require('@assets/射程.png')} />
        );
      case '弹速':
        return (
          <Image className={styles.icon} src={require('@assets/弹速.png')} />
        );
      case '伤害':
        return (
          <Image className={styles.icon} src={require('@assets/伤害.png')} />
        );
      case '幸运':
        return (
          <Image className={styles.icon} src={require('@assets/幸运.png')} />
        );
      case '移速':
        return (
          <Image className={styles.icon} src={require('@assets/移速.png')} />
        );
      case 'N':
        return (
          <InlineItem
            item={getItemData(nameZh ?? '当前道具')}
            linkable={false}
          />
        );
      case 'n':
        return (
          <InlineItem
            item={getItemData(nameZh ?? '当前道具')}
            linkable={false}
          />
        );
      case '复活顺序':
        return <ReviveDrawer />;
      case 'table':
        return (
          <ItemTable id={props.id} nameZh={props.nameZh} type={props.type} />
        );
    }
    // item| 开头，表示是一个物品
    if (data.startsWith('item|')) {
      const item = data.replace('item|', '');
      const targetItem = getItemData(item);
      if (!targetItem) {
        return '{{FIXME 没有命中的item}}' + item;
      }
      return (
        <InlineItem item={targetItem} linkable={props.id !== targetItem?.id} />
      );
    }
    // math| 开头，表示是一个计算公式
    if (data.startsWith('math|')) {
      const math = data
        .replace('math|', '')
        .replace('timesn', 'times n')
        .replace('timess', 'times s')
        .replace('timesd_0', 'times d_0');
      return (
        <View className={styles.math} style={{ fontSize: mathFontSize }}>
          <RichText
            nodes={parse(math, {
              throwError: true,
            })}
            style={{ display: 'inline-block' }}
          ></RichText>
        </View>
      );
    }
    // chara| 开头，表示是一个角色
    if (data.startsWith('chara|')) {
      const chara = formatCharaName(data.replace('chara|', ''));
      const charaData = handbookData.chara[unFormatCharaName(chara)];
      if (!charaData) {
        return chara;
      }
      return <InlineItem item={handbookData.chara[unFormatCharaName(chara)]} />;
    }
    // stage| 开头，表示是一个关卡
    if (data.startsWith('stage|')) {
      const stage = formatCharaName(data.replace('stage|', ''));
      let img = '';
      try {
        img = require(`@assets/stage/${stage}.png`);
      } catch (err) {}
      return (
        <>
          <Image className={styles.stage} src={img} />
          {unFormatCharaName(stage)}
          {` `}
        </>
      );
    }
    // room| 开头，表示是一个房间
    if (data.startsWith('room|')) {
      const room = data.replace('room|', '');
      return (
        <>
          <StuffIcon
            location={stuffIconPositionMap[room]}
            scale={1.8}
            top={4}
            marginLeft={12}
          />
          {room}
          {` `}
        </>
      );
    }
    // health| 开头，表示是一个生命值
    if (data.startsWith('health|')) {
      let health = data.replace('health|', '');
      // 碎心比较特殊，需要单独img
      if (health === '碎') {
        return (
          <>
            <Image className={styles.mode} src={require(`@assets/碎心.png`)} />
          </>
        );
      }
      // 空心之容器也特殊
      if (health === '红0') {
        return (
          <>
            <Image className={styles.mode} src={require(`@assets/红0.png`)} />
          </>
        );
      }
      if (health === '钱') {
        return (
          <>
            <Image className={styles.mode} src={require(`@assets/钱心.png`)} />
          </>
        );
      }
      if (health === '红0|永恒之心=1') {
        health = '永恒之心';
      }
      return (
        <>
          <StuffIcon
            location={stuffIconPositionMap[health]}
            scale={2.6}
            top={6}
            marginLeft={14}
          />
        </>
      );
    }
    // pool| 开头，表示是一个道具池
    if (data.startsWith('pool|')) {
      const pool = data.replace('pool|', '');
      return (
        <ItemGridDrawer title={'道具池：' + pool} poolFilter={pool}>
          <View
            style={{
              color: '#739ede',
              display: 'inline',
            }}
          >
            {`${pool}道具池`}
          </View>
        </ItemGridDrawer>
      );
    }
    // charaUnlock| 开头，表示是一个角色的解锁内容池
    if (data.startsWith('charaUnlock|')) {
      const nameZh = data.replace('charaUnlock|', '');
      return (
        <CharaUnlockDrawer title={'可解锁物品：' + nameZh} nameZh={nameZh}>
          <View
            style={{
              color: '#739ede',
              display: 'inline',
            }}
          >
            {`点击查看${nameZh}可解锁的物品`}
          </View>
        </CharaUnlockDrawer>
      );
    }
    // suit| 开头，表示是一个套装
    if (data.startsWith('suit|')) {
      const suit = data.replace('suit|', '');
      return (
        <ItemGridDrawer
          type="suit"
          title={convertTagToSuit[suit]}
          tagFilter={suit}
        >
          <View
            style={{
              color: '#739ede',
              display: 'inline',
            }}
          >
            {convertTagToSuit[suit]}
          </View>
        </ItemGridDrawer>
      );
    }
    // TTL| 开头，表示是一个标签
    if (data.startsWith('TTL|')) {
      const TTL = data.replace('TTL|', '');
      return (
        <ItemGridDrawer title={'标签：' + TTL} tagFilter={TTL}>
          <View
            style={{
              color: '#739ede',
              display: 'inline',
            }}
          >
            {`${TTL}`}
          </View>
        </ItemGridDrawer>
      );
    }
    // mode| 开头，表示是一个模式
    if (data.startsWith('mode|')) {
      const mode = data.replace('mode|', '');
      let img = '';
      try {
        if (mode.includes('贪婪')) {
          img = require(`@assets/mode/贪婪.png`);
        }
      } catch (err) {}
      if (!img) {
        return mode;
      }
      return (
        <>
          <Image className={styles.mode} src={img} />
          {mode}
          {` `}
        </>
      );
    }
    // file| 开头，表示需要读取本地图片
    if (data.startsWith('file|')) {
      let file = data.replace('file|', '');
      if (file.includes('|')) {
        file = file.split('|')[0];
      }
      let img = '';
      try {
        img = require(`@assets/file/${file}`);
      } catch (err) {}
      return (
        <>
          <Image className={styles.file} src={img} />
          {` `}
        </>
      );
    }
    // mark| 开头，表示需要读取本地图片
    if (data.startsWith('mark|')) {
      let mark = data.replace('mark|', '');
      if (mark.includes('|')) {
        mark = mark.split('|')[0];
      }
      let img = '';
      try {
        img = require(`@assets/mark/${mark}`);
      } catch (err) {}
      return (
        <>
          <Image
            className={styles.mark}
            src={img}
            style={{
              filter:
                themeColor.type === 'dark'
                  ? 'invert(100%) hue-rotate(180deg)'
                  : undefined,
            }}
          />
          {` `}
        </>
      );
    }
    // color 开头，表示内容需要有颜色
    if (data.startsWith('color|')) {
      const color = data.split('|')[1];
      return (
        <View
          style={{
            color,
            display: 'inline',
          }}
        >
          {data.split('|')[2]?.replace(/'/g, '')}
        </View>
      );
    }
    // ItemTable 开头，表示是需要展示道具列表
    if (data.startsWith('ItemTable|')) {
      const table = data.split('|')[1];
      return (
        <ItemGridDrawer title={'道具列表'} itemInfoList={table.split(',')}>
          <View
            style={{
              color: '#739ede',
            }}
          >
            点击查看道具列表
          </View>
        </ItemGridDrawer>
      );
    }
    // entity| 开头，表示是一个实体&敌人
    if (data.startsWith('entity|')) {
      const innterText = data.replace('entity|', '');
      const entityName = innterText.split('|')[0];
      const entityIcon = innterText.split('|')[1];
      const entityType = innterText.split('|')[2];
      return (
        <>
          {entityIcon && entityType && entityIcon.endsWith('px') && (
            <EntityIcon
              location={entityIcon.replace('px', 'px ')}
              scale={1}
              top={0}
              marginLeft={0}
              themeType={themeColor.type}
              entityType={entityType as any}
            />
          )}
          {entityName}
          {` `}
        </>
      );
    }
    // 以上都不是，直接返回data
    console.warn('未知的data', data);
    return data;
  };

  return (
    <View className={styles.container} style={{ lineHeight }}>
      {/* 将value中的{{}}替换为对应的数据 */}
      {/* props.value.split(/(\{\{.+?\}\})/g) */}
      {splitByNestedBrackets(props.value).map((item) => {
        if (item.startsWith('{{')) {
          let inner = item.slice(2, -2);
          inner = inner.replace('}}点伤害（n为炸弹的爆炸伤害', '点伤害');
          return transformInnerData(inner);
        }
        return item.replace(/\{\{/g, '').replace(/\}\}/g, '').replace(/'/g, '');
      })}
    </View>
  );
};

function splitByNestedBrackets(str: string) {
  let stack: string[] = []; // 用于跟踪括号的堆栈
  let start = 0; // 用于记录当前匹配的起始位置
  let result: string[] = []; // 存储最终结果的数组

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '{') {
      if (stack.length === 0) {
        // 当我们遇到第一个'{'时，将之前的内容添加到结果中
        if (i !== start) {
          result.push(str.substring(start, i));
        }
        start = i; // 更新起始位置
      }
      stack.push('{');
    } else if (str[i] === '}') {
      if (stack.length > 0) {
        stack.pop();
        // 当堆栈为空时，表示我们已经找到一个完整的匹配
        if (stack.length === 0) {
          result.push(str.substring(start, i + 1));
          start = i + 1;
        }
      }
    }
  }

  // 如果还有余下的内容，加到结果中
  if (start !== str.length) {
    result.push(str.substring(start));
  }

  return result;
}
