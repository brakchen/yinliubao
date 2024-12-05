const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// 定义用户模型
const userRoleBind = sequelize.define('user_role_bind', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
  tableName: 'user_role_bind',
  updatedAt: 'updated_at', // 更新时间,重定义时间命名
  createdAt: 'created_at', // 创建时间,重定义时间命名
});


module.exports = userRoleBind;

