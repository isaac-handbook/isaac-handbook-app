const cloud = require('wx-server-sdk');

cloud.init();

/**
 * 查询 score 表，搜索 level=100，按照 score 降序排列，取前 100 条
 */
exports.main = async (event, context) => {
  // 获取入参
  const level = event.level;
  const seasonID = event.seasonID;
  if (!level) {
    return {
      rankList: [],
    };
  }
  const db = cloud.database();
  const col = db.collection('score');
  const res = await col
    .where({ level: Number(level), seasonID: seasonID ? seasonID : null })
    .orderBy('score', 'desc')
    .limit(100)
    .get();
  const data = res.data;
  const rankList = data.map((item) => {
    return {
      avatar: item.avatar,
      nickname: item.nickname,
      score: item.score,
      level: item.level,
      openid: item._openid,
    };
  });

  return {
    rankList,
  };
};
