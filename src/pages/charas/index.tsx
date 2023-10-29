import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import {
  BadCharaList,
  NormalCharaList,
  badCharaList,
  normalCharaList,
} from './const';
import Taro from '@tarojs/taro';
import { formatCharaName } from '@utils/formatCharaName';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const onClick = (name: NormalCharaList | BadCharaList) => {
    // 跳转到角色详情页
    Taro.navigateTo({
      url: `/pages/chara-detail/index?charaName=${formatCharaName(name)}`,
    });
  };

  const renderNormalCharaImage = (name: NormalCharaList) => {
    if (name === '雅各和以扫') {
      return (
        <View className={styles.multImg}>
          <Image
            className={styles.img}
            mode="heightFix"
            src={require(`@assets/chara/body/雅各.png`)}
          />
          <Image
            className={styles.img}
            mode="heightFix"
            src={require(`@assets/chara/body/以扫.png`)}
          />
        </View>
      );
    }
    return (
      <Image
        className={styles.img}
        mode="heightFix"
        src={require(`@assets/chara/body/${formatCharaName(name)}.png`)}
      />
    );
  };

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
          color: themeColor.textColor,
        }}
      >
        <View className={styles.bigtitle}>普通角色</View>
        <View className={styles.boxContainer}>
          {normalCharaList.map((item) => {
            return (
              <View
                className={styles.box}
                key={item}
                onClick={() => onClick(item)}
              >
                {renderNormalCharaImage(item)}
                <View
                  className={styles.name}
                  style={{ color: themeColor.textColor }}
                >
                  {item}
                </View>
              </View>
            );
          })}
          <View className={styles.box}></View>
        </View>

        <View className={styles.bigtitle}>堕化角色</View>
        <View className={styles.boxContainer}>
          {badCharaList.map((item) => {
            return (
              <View
                className={styles.box}
                key={item}
                onClick={() => onClick(item)}
              >
                <Image
                  className={styles.img}
                  mode="heightFix"
                  src={require(
                    `@assets/chara/body/${formatCharaName(item)}.png`,
                  )}
                />
                <View
                  className={styles.name}
                  style={{ color: themeColor.textColor }}
                >
                  {item}
                </View>
              </View>
            );
          })}
          <View className={styles.box}></View>
        </View>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
