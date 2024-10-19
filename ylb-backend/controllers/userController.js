const User = require('../models/user');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { UserStatus } = require('../datadict/enums/UserEnums');
const ErrorNoEnums = require('../datadict/enums/errorNoEnums');
exports.register = async (req, res) => {
  let resData = ErrorNoEnums.SUCCESS;
  try {
    const { phone, password } = req.body;
    
    // 验证手机号和密码，前端验证
    // if (!isValidPhone(phone) || !isValidPassword(password)) {
    //   return res.status(400).json({ errno: 30003, errormsg: "无效的手机号或密码" });
    // }

    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
      resData  = ErrorNoEnums.USER_ALREADY_EXISTS;
    }

    await User.create({ phone, password,status:UserStatus.ACTIVE });
  } catch (error) {
    resData = ErrorNoEnums.UNEXPECTED_ERROR;
    logger.error('注册失败', { error });
  }finally{
    res.json(resData);
  }
};

exports.login = async (req, res) => {
  let resData = ErrorNoEnums.SUCCESS;
  try {
    const { phone, password } = req.body;
    const user = await User.findByPhone(phone);

    if (!user || !(await User.validatePassword(user, password))) {
      resData = ErrorNoEnums.LOGIN_FAILED;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    resData = ErrorNoEnums.LOGIN_SUCCESS;
    resData.token = token;
  } catch (error) {
    logger.error('登录失败', { error });
    resData = ErrorNoEnums.UNEXPECTED_ERROR;
  }finally{
    res.json(resData);
  }
};

