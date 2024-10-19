const User = require('../models/user');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

exports.register = async (req, res) => {
  try {
    const { phone, password } = req.body;
    
    // 验证手机号和密码
    if (!isValidPhone(phone) || !isValidPassword(password)) {
      return res.status(400).json({ errno: 30003, errormsg: "无效的手机号或密码" });
    }

    const existingUser = await User.findByPhone(phone);
    if (existingUser) {
      return res.status(400).json({ errno: 30001, errormsg: "用户已经存在" });
    }

    await User.create(phone, password);
    res.json({ errno: 0, errormsg: "注册成功" });
  } catch (error) {
    logger.error('注册失败', { error });
    res.status(500).json({ errno: 20001, errormsg: "注册失败" });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findByPhone(phone);

    if (!user || !(await User.validatePassword(user, password))) {
      return res.status(401).json({ errno: 30002, errormsg: "登录失败" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ errno: 0, errormsg: "登录成功", token });
  } catch (error) {
    logger.error('登录失败', { error });
    res.status(500).json({ errno: 20001, errormsg: "登录失败" });
  }
};

function isValidPhone(phone) {
  return /^1[3-9]\d{9}$/.test(phone);
}

function isValidPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*(\d)\1{2,}).{6,}$/.test(password);
}

