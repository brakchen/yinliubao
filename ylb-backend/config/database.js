const { Sequelize } = require('sequelize');
const logger = require('../middleware/logger');



// Read the system environment variable
const DB_USER_NAME = process.env.DB_USER_NAME || 'ylb';  // Fallback to default value if not set
const DB_PASSWORD = process.env.DB_PASSWORD || '';  // Fallback to default value if not set
logger.info('DB_PASSWORD: '+ DB_PASSWORD);
logger.info('DB_USER_NAME: '+ DB_USER_NAME);







// 创建 Sequelize 实例
const sequelize = new Sequelize('ylb', DB_USER_NAME, DB_PASSWORD, {
  host: '101.43.176.206',
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