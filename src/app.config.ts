export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/exam/index',
    'pages/paper/index',
    // 'pages/scan/index',
    'pages/item-detail/index',
    'pages/trinkets/index',
    'pages/cards/index',
    'pages/pills/index',
    'pages/about/index',
    'pages/boss-mark/index',
    'pages/dice-room/index',
    'pages/sacrifice-room/index',
    'pages/others/index',
    'pages/suit/index',
    'pages/charas/index',
    'pages/chara-detail/index',
  ],
  subpackages: [
    {
      root: 'package-scan',
      pages: ['pages/scan/index'],
    },
  ],
  tabBar: {
    color: '#606468',
    selectedColor: '#0089ff',
    backgroundColor: '#c4b39d',
    custom: false,
    list: [
      {
        pagePath: 'pages/index/index',
        text: '图鉴',
        iconPath: 'assets/tab/event.png',
        selectedIconPath: 'assets/tab/event_active.png',
      },
      {
        pagePath: 'pages/exam/index',
        text: '课堂',
        iconPath: 'assets/tab/schedule.png',
        selectedIconPath: 'assets/tab/schedule_active.png',
      },
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});
