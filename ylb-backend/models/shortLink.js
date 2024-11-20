const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const DataStatusEnums  = require('../datadict/enums/DataStatusEnums');

// 定义用户模型
const ShortLink = sequelize.define('ShortLink', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  short_url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  origin_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(Object.values(DataStatusEnums)),
    defaultValue: DataStatusEnums.INACTIVE,
  },
}, {
  timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
  tableName: 'short_link',
  updatedAt: 'updated_at', // 更新时间,重定义时间命名
  createdAt: 'created_at', // 创建时间,重定义时间命名
});



module.exports = ShortLink;

