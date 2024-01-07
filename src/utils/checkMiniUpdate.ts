import Taro from '@tarojs/taro';

export const checkMiniUpdate = () => {
  // 检查更新
  const updateManager = Taro.getUpdateManager();

  const update = () => {
    Taro.showModal({
      title: '更新提示!',
      content: '新版本已经准备好啦，是否重启应用？',
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  };

  updateManager.onCheckForUpdate(function () {});

  updateManager.onUpdateReady(function () {
    update();
  });
};
