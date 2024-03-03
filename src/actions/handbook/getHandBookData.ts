import { HANDBOOK_DATA_OSS_URL } from '@constants';
import Taro from '@tarojs/taro';
import { sleep } from '@utils/sleep';
import { HandBookData } from 'src/types/handbook';
import alias from '@data/alias.json';
import itemsExtra from '@data/itemsExtra.json';
import trinketsExtra from '@data/trinketsExtra.json';
import { colorTypeList } from '@hooks/useItemSearchInfo';
import { isDev } from '@utils/env';
import { pickItemFromHandbook } from '@components/ContentTransformer/utils/pickItemFromHandbook';

// 请求失败后重试的次数
let reTryTimes = 0;

/**
 * 从缓存或接口获取图鉴数据
 */
export const getHandBookData = async (): Promise<HandBookData> => {
  try {
    const cacheData = getFromStorage();
    if (cacheData.length > 0) {
      return initJsonData(cacheData);
    } else {
      // 展示加载中
      Taro.showLoading({
        title: '加载中...',
        mask: true,
      });
      const res = await Taro.cloud.downloadFile({
        fileID: HANDBOOK_DATA_OSS_URL,
      });
      const fileData = Taro.getFileSystemManager().readFileSync(
        res.tempFilePath,
        'utf-8',
      );
      Taro.hideLoading();
      if (typeof fileData === 'string') {
        saveToStorage(fileData);
        return initJsonData(fileData);
      }
      throw new Error('数据获取失败');
    }
  } catch (error) {
    if (++reTryTimes > 5) {
      Taro.hideLoading();
      Taro.showToast({
        title: '人气大爆发，稍后试试吧',
        icon: 'none',
        duration: 3000,
      });
      throw new Error('数据获取失败，重试次数过多');
    }
    console.warn('数据获取失败，即将重试');
    console.warn(error);
    await sleep(500);
    return getHandBookData();
  }
};

/**
 * 获取缓存数据
 * @returns
 */
const getFromStorage = () => {
  let data = '';
  try {
    data =
      Taro.getStorageSync('handbookDataPart1') +
      Taro.getStorageSync('handbookDataPart2') +
      Taro.getStorageSync('handbookDataPart3') +
      Taro.getStorageSync('handbookDataPart4') +
      Taro.getStorageSync('handbookDataPart5');
  } catch (err) {}

  return data;
};

/**
 * 格式化JSON数据
 * @param data
 * @returns HandBookData
 */
const initJsonData = (data: string) => {
  const res = JSON.parse(data) as HandBookData;
  if (!res.items?.length || !res.trinkets?.length) {
    throw new Error('缓存数据异常');
  }
  // 所有 items 都加入 type=item
  res.items = res.items.map((item) => ({
    ...item,
    type: 'item',
  }));
  // 遍历每一个 item，将 alias.json、itemsExtra.json 的内容添加进去
  res.items = res.items.map((item) => {
    if (alias[item.nameZh]) {
      item.alias = alias[item.nameZh];
    }
    // 塞 colors
    if (itemsExtra[String(item.id)]) {
      item.colors = itemsExtra[String(item.id)]?.color || [];
    }
    if (isDev) {
      // 如果 item.colors 中的值不存在与 ColorType 中，则提示
      item.colors.forEach((color) => {
        if (!colorTypeList.includes(color)) {
          console.warn(
            `item ${item.nameZh} ID=${item.id} 的颜色 ${color} 不存在`,
          );
        }
      });
    }
    return item;
  });

  // 所有 trinkets 都加入 type=trinket
  res.trinkets = res.trinkets.map((trinket) => ({
    ...trinket,
    type: 'trinket',
  }));

  // 遍历每一个 trinkets，将 trinketsExtra.json 的内容添加进去
  res.trinkets = res.trinkets.map((trinket) => {
    // 塞 colors
    if (trinketsExtra[String(trinket.id)]) {
      trinket.colors = trinketsExtra[String(trinket.id)]?.color || [];
    }
    if (isDev) {
      // 如果 trinket.colors 中的值不存在与 ColorType 中，则提示
      trinket.colors.forEach((color) => {
        if (!colorTypeList.includes(color)) {
          console.warn(
            `trinket ${trinket.nameZh} ID=${trinket.id} 的颜色 ${color} 不存在`,
          );
        }
      });
    }
    return trinket;
  });

  // 所有 cards 都加入 type=card
  res.cards = res.cards.map((card) => ({
    ...card,
    type: 'card',
  }));

  // 所有 pills 都加入 type=pill
  res.pills = res.pills.map((pill) => ({
    ...pill,
    type: 'pill',
  }));

  // 所有 chara 都加入 type=chara
  Object.keys(res.chara).forEach((key) => {
    res.chara[key] = {
      ...res.chara[key],
      type: 'chara',
    };
  });

  // 遍历每一个 achieve，寻找 unlock 和 unlockItem 中包含的 {{item|ID=XXX}}
  res.achieve = res.achieve.map((achieve) => {
    if (!achieve.tmp) {
      achieve.tmp = '';
    }
    if (achieve.unlock) {
      // 使用正则匹配所有 {{item|ID=XXX}}，中的 XXX。其中 XXX 为 string
      achieve.unlock.match(/\{\{item\|ID=(.*?)\}\}/g)?.forEach((match) => {
        const it = pickItemFromHandbook({
          target: match.replace('{{item|', '').replace('}}', ''),
          handbookData: res,
        });
        achieve.tmp += (it?.nameZh || '') + ' ';
      });
    }
    if (achieve.unlockItem) {
      // 使用正则匹配所有 {{item|ID=XXX}}，中的 XXX。其中 XXX 为 string
      achieve.unlockItem.match(/\{\{item\|ID=(.*?)\}\}/g)?.forEach((match) => {
        const it = pickItemFromHandbook({
          target: match.replace('{{item|', '').replace('}}', ''),
          handbookData: res,
        });
        achieve.tmp += (it?.nameZh || '') + ' ';
      });
    }
    return achieve;
  });

  return res;
};

/**
 * 将数据存入缓存
 * @param data
 */
const saveToStorage = (data: string) => {
  // 由于微信缓存单条上限1mb，因此将数据拆成4份存储
  const dataLength = data.length;
  const partLength = Math.ceil(dataLength / 5);
  const part1 = data.slice(0, partLength);
  const part2 = data.slice(partLength, partLength * 2);
  const part3 = data.slice(partLength * 2, partLength * 3);
  const part4 = data.slice(partLength * 3, partLength * 4);
  const part5 = data.slice(partLength * 4);
  Taro.setStorage({
    key: 'handbookDataPart1',
    data: part1,
  });
  Taro.setStorage({
    key: 'handbookDataPart2',
    data: part2,
  });
  Taro.setStorage({
    key: 'handbookDataPart3',
    data: part3,
  });
  Taro.setStorage({
    key: 'handbookDataPart4',
    data: part4,
  });
  Taro.setStorage({
    key: 'handbookDataPart5',
    data: part5,
  });
};
