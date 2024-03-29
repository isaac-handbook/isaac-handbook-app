import React from 'react';
import { ScrollView, View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import { Popup } from '@nutui/nutui-react-taro';
import { useRecoilState } from 'recoil';
import { themeInfoState } from '@hooks/useThemeInfo';
import classNames from 'classnames';
import { drawerMaskColor } from '@src/styles';
import { Curse } from '@typers/handbook';
import { PaperHeader } from '@pages/item-detail/components/PaperHeader';
import { DetailContent } from '@pages/item-detail/components/DetailContent';

interface Props {
  curse: Curse;
  block?: boolean;
}

export const CurseDetailDrawer: React.FC<Props> = (props) => {
  const { curse, block = false } = props;

  const [showDrawer, setShowDrawer] = React.useState(false);

  const [{ themeColor }] = useRecoilState(themeInfoState);

  let curseImg = '';
  try {
    curseImg = require(`@assets/curse/${curse.nameZh}.png`);
  } catch (err) {}

  return (
    <>
      <View
        className={classNames(styles.children, block && styles.block)}
        style={{
          color: block ? themeColor.textColor : themeColor.linkColor,
        }}
        onClick={() => setShowDrawer(true)}
      >
        <Image className={styles.icon} src={curseImg} />
        {curse.nameZh}
      </View>
      <Popup
        title={'诅咒'}
        visible={showDrawer}
        position="bottom"
        round
        onClose={() => {
          setShowDrawer(false);
        }}
        closeable
        overlay={true}
        overlayStyle={{ backgroundColor: drawerMaskColor }}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
        lockScroll
        destroyOnClose
      >
        <ScrollView className={styles.drawer} scrollY>
          <PaperHeader
            type="oneRow"
            descZh={
              <>
                <Image
                  className={styles.icon}
                  style={{ transform: 'scale(1.8)' }}
                  src={curseImg}
                />
                {curse.nameZh}
              </>
            }
          />
          <DetailContent item={curse} />
        </ScrollView>
      </Popup>
    </>
  );
};
