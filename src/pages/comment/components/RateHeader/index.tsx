import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { ItemIcon } from '@components/ItemIcon';
import { ItemType } from 'src/types/handbook';
import { Rate } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { useUser } from '@hooks/useUser';
import { getItemRate } from '@utils/rate';

interface Props {
  itemId: string;
  iconPosition: string;
  type: ItemType;
  charge?: string;
}

export const RateHeader: React.FC<Props> = (props) => {
  const {
    user: { openid },
  } = useUser();

  const [rate, setRate] = React.useState<number>(0);
  const [avgRate, setAvgRate] = React.useState<number>(0);

  useEffect(() => {
    // 查询当前用户是否已经评分
    const db = Taro.cloud.database();
    const col = db.collection('rate');
    col
      .where({
        itemId: props.itemId,
        itemType: props.type,
        _openid: openid,
      })
      .get()
      .then((res) => {
        if (res.data.length > 0) {
          const rate = res.data[0].rate;
          setRate(rate);
        }
      });
    // 计算一下当前道具的平均分
    getItemRate(props.itemId, props.type).then((avgRate) => {
      setAvgRate(avgRate);
    });
  }, []);

  const handleRateChange = async (value: number) => {
    setRate(value);
    Taro.showLoading({ title: '评分中', mask: true });
    // 更新 rate 库中该道具的评分
    const db = Taro.cloud.database();
    const col = db.collection('rate');
    col
      .where({
        itemId: props.itemId,
        itemType: props.type,
        _openid: openid,
      })
      .get()
      .then(async (res) => {
        if (res.data.length === 0) {
          await col.add({
            data: {
              itemId: props.itemId,
              itemType: props.type,
              rate: value,
            },
          });
        } else {
          await col.doc(res.data[0]._id as any).update({
            data: {
              rate: value,
            },
          });
        }
        Taro.hideLoading();
        Taro.showToast({ title: '评分成功', icon: 'success', mask: true });
        // 刷新平均分
        getItemRate(props.itemId, props.type).then((avgRate) => {
          setAvgRate(avgRate);
        });
      });
  };

  return (
    <View className={styles.container}>
      <View className={styles.iconContainer}>
        <ItemIcon
          id={props.itemId}
          location={props.iconPosition}
          size="grid-large"
          type={props.type}
          scaleRate={1.2}
        />
      </View>
      <View className={styles.rateContainer}>
        <Rate
          value={rate}
          defaultValue={3}
          onChange={handleRateChange}
          style={{ '--nutui-rate-icon-color': 'red' } as any}
        />
        <View className={styles.avgRate}>平均分：{avgRate.toFixed(1)}</View>
      </View>
    </View>
  );
};
