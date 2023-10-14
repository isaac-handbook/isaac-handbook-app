import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { handbookDataState } from '@hooks/useHandbookData';
import { useRecoilState } from 'recoil';
import { ItemGridDrawer } from '@components/ItemGridDrawer';
import { convertTagToSuit } from '@pages/index/components/ItemFilter/TagFilter';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const [handbookData] = useRecoilState(handbookDataState);

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
      >
        <View className={styles.boxContainer}>
          {handbookData.extra.suitList.map((item, index) => {
            const { name: suit } = item;
            const curSuit = convertTagToSuit[suit];
            return (
              <ItemGridDrawer title={curSuit} tagFilter={suit} key={index}>
                <View className={styles.box}>
                  <Image
                    className={styles.img}
                    mode="heightFix"
                    src={require(`@assets/suit/${curSuit}.png`)}
                  />
                  <View style={{ color: themeColor.textColor }}>{curSuit}</View>
                </View>
              </ItemGridDrawer>
            );
          })}
        </View>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
