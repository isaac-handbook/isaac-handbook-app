import { permission_request } from '@utils/permisson';

const userCameraName = 'scope.camera'; // 摄像头权限
const userCameraZhName = '手机摄像头'; // 摄像头权限对应的中文名称
// 请求摄像头权限
export const requestCameraPermission = () =>
  permission_request(userCameraName, userCameraZhName, (res) => {
    // 如果 res 为 true，则刷新页面
    if (res) {
      wx.reLaunch({
        url: '/pages/scan/index',
      });
    }
  });
