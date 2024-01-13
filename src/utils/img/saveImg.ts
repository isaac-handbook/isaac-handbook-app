export const saveImgByFailPath = (filePath: string) => {
  // 保存图片到相册
  wx.saveImageToPhotosAlbum({
    filePath,
    success: () => {
      wx.showToast({
        title: '图片已保存',
        icon: 'success',
        duration: 2000,
      });
    },
    fail: (err) => {
      console.log('保存失败', err);
    },
  });
};
