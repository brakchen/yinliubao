const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// 定义用户模型
const User = sequelize.define('User', {
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('有效', '失效'),
    defaultValue: '有效',
  },
}, {
  timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
});

module.exports = User;


// const pool = mysql.createPool(dbConfig);

// class User {
//   static async create(phone, password) {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const [result] = await pool.execute(
//       'INSERT INTO users (phone, password, status, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
//       [phone, hashedPassword, 'active']
//     );
//     return result.insertId;
//   }

//   static async findByPhone(phone) {
//     const [rows] = await pool.execute('SELECT * FROM users WHERE phone = ?', [phone]);
//     return rows[0];
//   }

//   static async validatePassword(user, password) {
//     return bcrypt.compare(password, user.password);
//   }
// }

// module.exports = User;

