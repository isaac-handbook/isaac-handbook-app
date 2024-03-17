import Taro from '@tarojs/taro';

/** 计算道具的平均分 */
export const getItemRate = async (itemId: string, itemType: string) =>
  new Promise<number>((resolve) => {
    const db = Taro.cloud.database();
    //@ts-ignore
    const $ = db.command.aggregate;
    db.collection('rate')
      .aggregate()
      .match({
        itemId: itemId,
        itemType: itemType,
      })
      .group({
        _id: '$itemId',
        average: $.avg('$rate'),
      })
      .end()
      .then((res: any) => {
        if (res.list.length > 0) {
          const avgRate = res.list[0].average;
          resolve(avgRate);
        } else {
          resolve(0);
        }
      });
  });
