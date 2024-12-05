const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// 定义用户模型
const roles = sequelize.define('roles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  resource: {
    type: DataTypes.STRING,
    allowNull: true
  },
  permission: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
  tableName: 'roles',
  updatedAt: 'updated_at', // 更新时间,重定义时间命名
  createdAt: 'created_at', // 创建时间,重定义时间命名
});


module.exports = roles;

