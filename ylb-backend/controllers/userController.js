const User = require('../models/user');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { UserStatus } = require('../datadict/enums/UserEnums');
const ErrorNoEnums = require('../datadict/enums/errorNoEnums');
const { hashPassword, validatePassword } = require('../utils/userUtils');

exports.register = async (req, res) => {

  const { phone, password } = req.body;
  await User.findOne({ where: { phone: phone } }).then(user => {
    logger.info('register existingUser: %s',JSON.stringify(user));
    if (user) {
      res.json(ErrorNoEnums.USER_ALREADY_EXISTS);
    }else{
      hashPassword(password).then(hashedPassword => {
        logger.info('register hashedPassword: %s',hashedPassword);
        User.create({ phone, password:hashedPassword,status:UserStatus.ACTIVE }).then(user => {
          logger.info('register user: %s',JSON.stringify(user));
          let resData = ErrorNoEnums.SUCCESS;
          res.json(resData);
        }).catch(error => {
          logger.error('register save failed %s',error.message);
          res.json( ErrorNoEnums.REGISTER_FAILED);
        });
      });
    }
  }).catch(error => {
    logger.error('query user failed %s',error.message);
    res.json( ErrorNoEnums.VALIDATE_USER_FAILED);
  });

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

