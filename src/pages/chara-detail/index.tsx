import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { SideNav } from '@components/SideNav';
import styles from './index.module.scss';
import { handbookDataState } from '@hooks/useHandbookData';
import Taro from '@tarojs/taro';
import ErrorBoundary from '@components/ErrorBoundary';
import { themeInfoState } from '@hooks/useThemeInfo';
import { useRecoilState } from 'recoil';
import { BadCharaList, NormalCharaList } from '@pages/charas/const';
import { DetailContent } from '@pages/item-detail/components/DetailContent';
import { SingleCharaBox } from './components/SingleCharaBox';
import { unFormatCharaName } from '@utils/formatCharaName';
import LoadingPage from '@components/ErrorBoundary/LoadingPage';

function ItemDetail() {
  const [handbookData] = useRecoilState(handbookDataState);
  const [{ themeColor }] = useRecoilState(themeInfoState);

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

        <DetailContent item={chara} handbookData={handbookData} type="chara" />
      </View>
      <SideNav />
    </ErrorBoundary>
  );
}

export default ItemDetail;
