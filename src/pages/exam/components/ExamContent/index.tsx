import React from 'react';
import { View, Button } from '@tarojs/components';
import styles from './index.module.scss';
import Taro from '@tarojs/taro';
import { useExamPaper } from '@hooks/useExamPaper';
import { NavItem } from '../NavItem';
import { levelStringMap, paperLevelMap } from '@pages/paper/constant';
import { useApp } from '@hooks/useApp';
import { useSetting } from '@hooks/useSetting';
import { Ranking } from '../Ranking';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { Season } from '@src/config/type';

interface Props {
  season: Season;
}

export const ExamContent: React.FC<Props> = (props) => {
  const { season } = props;

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const {
    examPaper: { userScoreMap },
  } = useExamPaper();

  const {
    app: { examConfig },
  } = useApp();

  const {
    setting: { developerMode },
  } = useSetting();

  const getLevelDesc = (level: number) => {
    const configTip = examConfig[`level${level}Tip`];
    // 从 paperLevelMap 计算当前 level 有多少个题目
    let levelCount: number = 0;
    if (level !== 999) {
      levelCount = paperLevelMap[String(level)].stageMap.reduce((pre, cur) => {
        return pre + cur.count;
      }, 0);
    }
    return configTip?.replace(/\{\{count\}\}/g, String(levelCount));
  };

  // 清空 score 集合中所有个人的数据
  const handleClearUser = async () => {
    Taro.showLoading({
      title: '清理中',
    });
    // 获取剪切板中的 openid
    const clipRes = await Taro.getClipboardData();
    const openid = clipRes.data;
    if (!openid || openid.length > 30) {
      Taro.showToast({
        title: '剪切板中没有 openid',
        icon: 'none',
      });
      return;
    }
    const db = Taro.cloud.database();
    const col = db.collection('score');
    const res = await col.where({ _openid: openid }).get();
    const ids = res.data.map((item) => item._id);
    for (const id of ids) {
      await col.doc(id as any).remove({});
    }
    Taro.hideLoading();
    Taro.showToast({
      title: '清理成功',
      icon: 'success',
    });
  };

  return (
    <ErrorBoundary>
      <View
        className={styles.container}
        style={{ color: themeColor.textColor }}
      >
        <NavItem
          level={1}
          title={levelStringMap['1']}
          disabled={false}
          desc={getLevelDesc(1)}
          levelScore={userScoreMap[season.id].level1}
          iconSrc={require('../../../../assets/chara/以撒.png')}
          season={season}
        />
        <NavItem
          level={2}
          title={levelStringMap['2']}
          disabled={userScoreMap[season.id].level1 < 60}
          desc={getLevelDesc(2)}
          levelScore={userScoreMap[season.id].level2}
          iconSrc={require('../../../../assets/chara/堕化以撒.png')}
          season={season}
        />
        <NavItem
          level={3}
          title={levelStringMap['3']}
          disabled={userScoreMap[season.id].level2 < 60}
          desc={getLevelDesc(3)}
          levelScore={userScoreMap[season.id].level3}
          iconSrc={require('../../../../assets/chara/游魂.png')}
          season={season}
        />
        <NavItem
          level={100}
          title={levelStringMap['100']}
          disabled={userScoreMap[season.id].level3 < 60}
          desc={getLevelDesc(100)}
          levelScore={userScoreMap[season.id].level100}
          iconSrc={require('../../../../assets/chara/堕化游魂.png')}
          season={season}
        />
        <NavItem
          level={999}
          title={levelStringMap['999']}
          disabled={userScoreMap[season.id].level3 < 60}
          desc={getLevelDesc(999)}
          levelScore={userScoreMap[season.id].level999}
          iconSrc={require('../../../../assets/chara/以撒.png')}
          season={season}
        />

        {(!examConfig.rankDegrade || developerMode) && (
          <>
            {season.rankStatus !== 'closed' && (
              <Ranking season={season} rankType="normal" />
            )}
            {season.enableEndless && season.endlessRankStatus !== 'closed' && (
              <Ranking season={season} rankType="endless" />
            )}
          </>
        )}

        {developerMode && (
          <Button className={styles.clearBtn} onClick={handleClearUser}>
            清除剪切板中 openid 的数据
          </Button>
        )}
      </View>
    </ErrorBoundary>
  );
};
