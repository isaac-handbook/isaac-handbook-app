import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { useHandBookData } from '@hooks/useHandbookData';
import Taro from '@tarojs/taro';
import ErrorBoundary from '@components/ErrorBoundary';
import { BadCharaList, NormalCharaList } from '@pages/charas/const';
import { DetailContent } from '@pages/item-detail/components/DetailContent';
import { SingleCharaBox } from './components/SingleCharaBox';
import { unFormatCharaName } from '@utils/formatCharaName';
import LoadingPage from '@components/ErrorBoundary/LoadingPage';
import { useThemeInfo } from '@hooks/useThemeInfo';

function ItemDetail() {
  const { handbookData } = useHandBookData();
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const [charaName, setCharaName] = React.useState<
    NormalCharaList | BadCharaList
  >();

  // 获取页面参数中的 itemId
  useEffect(() => {
    const { charaName } = Taro.getCurrentInstance().router?.params as any;
    setCharaName(charaName);
  }, []);

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
      </View>
    </ErrorBoundary>
  );
}

export default ItemDetail;
