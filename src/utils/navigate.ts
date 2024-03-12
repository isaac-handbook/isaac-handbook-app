import Taro from '@tarojs/taro';

export const safeNavigate = (option: Parameters<typeof Taro.navigateTo>[0]) => {
  Taro.navigateTo({
    ...option,
    fail: (err) => {
      if (err.errMsg.includes('limit')) {
        // 关闭当前页面，打开新的页面
        Taro.redirectTo({
          url: option.url,
        });
        setTimeout(() => {
          Taro.showToast({
            duration: 1800,
            title: '页面打开数量已达上限，已关闭上一级页面',
            icon: 'none',
          });
        }, 200);
      }
    },
  });
};
