import { Item } from '@typers/handbook';

const wikiBaseUrl = 'https://isaac.huijiwiki.com';

/** 获取某个 item 的 wiki 链接 */
export const getItemWikiLink = (item: Item) => {
  switch (item.type) {
    case 'item':
      return `${wikiBaseUrl}/wiki/C${item.id}`;
    case 'trinket':
      return `${wikiBaseUrl}/wiki/T${item.id}`;
    case 'card':
      return `${wikiBaseUrl}/wiki/K${item.id}`;
    case 'pill':
      return `${wikiBaseUrl}/wiki/P${item.id}`;
    case 'chara':
      return `${wikiBaseUrl}/wiki/${item.nameZh}`;
    default:
      return wikiBaseUrl;
  }
};
