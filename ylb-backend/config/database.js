const { Sequelize } = require('sequelize');

const logger = require('../middleware/logger');

// 创建 Sequelize 实例
const sequelize = new Sequelize('ylb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// 测试连接
sequelize.authenticate()
  .then(() => {
    logger.info('数据库连接成功');
  })
  .catch(err => {
    logger.error('数据库连接失败:', err);
  });

module.exports = sequelize;