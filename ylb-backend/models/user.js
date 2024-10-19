const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const dbConfig = require('../config/database');

const pool = mysql.createPool(dbConfig);

class User {
  static async create(phone, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (phone, password, status, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [phone, hashedPassword, 'active']
    );
    return result.insertId;
  }

  static async findByPhone(phone) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE phone = ?', [phone]);
    return rows[0];
  }

  static async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  }
}

module.exports = User;

