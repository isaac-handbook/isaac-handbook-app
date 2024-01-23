import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { ItemGridDrawer } from '@components/ItemGridDrawer';
import { convertTagToSuit } from '@pages/index/components/ItemFilter/TagFilter';
import suitList from '@data/suit.json';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

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
          {suitList.map((item, index) => {
            const { name: suit } = item;
            const curSuit = convertTagToSuit[suit];
            return (
              <ItemGridDrawer
                type="suit"
                title={curSuit}
                tagFilter={suit}
                key={index}
              >
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
