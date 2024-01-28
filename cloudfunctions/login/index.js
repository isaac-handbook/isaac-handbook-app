const cloud = require('wx-server-sdk');

cloud.init();

/**
 * 使用云函数获取用户 openid
 */
exports.main = async (event, context) => {
  let { OPENID } = cloud.getWXContext();

  return {
    OPENID,
  };
};
