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
    'pages/user-edit/index',
  ],
  subpackages: [
    {
      root: 'package-scan',
      pages: ['pages/scan/index'],
    },
  ],
  tabBar: {
    color: '#000000',
    selectedColor: '#000000',
    backgroundColor: '#c4b39d',
    custom: false,
    list: [
      {
        pagePath: 'pages/index/index',
        text: '图鉴',
        iconPath: 'assets/tab/home.png',
        selectedIconPath: 'assets/tab/home-fill.png',
      },
      {
        pagePath: 'pages/exam/index',
        text: '课堂',
        iconPath: 'assets/tab/writing.png',
        selectedIconPath: 'assets/tab/writing-fill.png',
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
