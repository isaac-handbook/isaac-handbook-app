import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useHandBookData } from '@hooks/useHandbookData';
import Taro, { useShareAppMessage } from '@tarojs/taro';
import ErrorBoundary from '@components/ErrorBoundary';
import { DetailContent } from '@pages/item-detail/components/DetailContent';
import { SingleCharaBox } from './components/SingleCharaBox';
import { unFormatCharaName } from '@utils/formatCharaName';
import LoadingPage from '@components/ErrorBoundary/LoadingPage';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { CharaAchieve } from './components/CharaAchieve';
import { useShareMenu } from '@utils/hooks/useShareMenu';

function ItemDetail() {
  const { handbookData } = useHandBookData();
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const { charaName } = Taro.getCurrentInstance().router?.params as any;

  useShareMenu();
  useShareAppMessage(() => {
    return {
      title: `角色 - ${charaName}`,
      path: `/pages/chara-detail/index?charaName=${charaName}`,
    };
  });

  const chara = handbookData.chara[unFormatCharaName(charaName)];

  if (!chara) {
    return <LoadingPage />;
  }

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
      >
        {chara.infoList.map((charaInfo) => (
          <SingleCharaBox charaInfo={charaInfo} />
        ))}

        <DetailContent item={chara} />

        {chara.infoList.map((charaInfo) => (
          <CharaAchieve charaInfo={charaInfo} />
        ))}
      </View>
    </ErrorBoundary>
  );
}

export default ItemDetail;
