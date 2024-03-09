import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ErrorBoundary from '@components/ErrorBoundary';
import { useThemeInfo } from '@hooks/useThemeInfo';
import { useHandBookData } from '@hooks/useHandbookData';
import { IndexTopNav } from '@components/IndexTopNav';
import { CurseDetailDrawer } from './components/CurseDetailDrawer';

function Index() {
  const {
    themeInfo: { themeColor },
  } = useThemeInfo();

  const {
    handbookData: {
      extra: { curse },
    },
  } = useHandBookData();

  console.log('curse', curse);

  return (
    <ErrorBoundary>
      <View
        className={styles.page}
        style={{
          backgroundColor: themeColor.bgColor,
        }}
      >
        <IndexTopNav type="curse" supportSetting={false} />
        <View className={styles.list}>
          {curse.map((cur) => (
            <View className={styles.item} key={cur.nameZh}>
              <CurseDetailDrawer curse={cur} childrenScale={1.1} />
            </View>
          ))}
        </View>
      </View>
    </ErrorBoundary>
  );
}

export default Index;
