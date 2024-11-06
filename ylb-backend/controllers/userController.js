const User = require('../models/user');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { UserStatus } = require('../datadict/enums/UserEnums');
const ErrorNoEnums = require('../datadict/enums/errorNoEnums');
const { hashPassword, validatePassword } = require('../utils/userUtils');

exports.register = async (req, res) => {
  let resData = ErrorNoEnums.SUCCESS;
  try {
    const { phone, password } = req.body;

    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
      resData  = ErrorNoEnums.USER_ALREADY_EXISTS;
    }
    const hashedPassword = await hashPassword(password);

    const res = await User.create({ phone, password:hashedPassword,status:UserStatus.ACTIVE });
    logger.info(`注册成功 ${res}`);
  } catch (error) {
    resData = ErrorNoEnums.UNEXPECTED_ERROR;
    logger.error(`注册失败 ${error.message}`);
  }finally{
    res.json(resData);
  }
};

exports.login = async (req, res) => {
  let resData = ErrorNoEnums.SUCCESS;
  try {
    const { phone, password } = req.body;
    logger.info(`login request ${phone} ${password} `);
    await User.findOne({ where: { phone : phone } }).then(user => {
      logger.info('user: %s', JSON.stringify(user))
      if (!user) {
        return res.json(ErrorNoEnums.USER_NOT_FOUND);
      }

      if (!validatePassword(user, password)) {
        return res.json(ErrorNoEnums.INVALID_PHONE_OR_PASSWORD);
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      resData = ErrorNoEnums.LOGIN_SUCCESS;
      resData.token = token;
      return  res.json(resData);
    }).catch(error => {
      logger.error(`登录失败 ${error.message}`);
      return res.json( ErrorNoEnums.UNEXPECTED_ERROR);
    })
  } catch (error) {

  }
};

