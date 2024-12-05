const User = require('../models/user');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { UserStatus } = require('../datadict/enums/UserEnums');
const ErrorNoEnums = require('../datadict/enums/errorNoEnums');
const { hashPassword, validatePassword } = require('../utils/userUtils');
const roles = require('../models/roles');
const redis = require('../config/redis');

exports.register = async (req, res) => {

  const { username, password } = req.body;
  await User.findOne({ where: { username: username } }).then(user => {
    logger.info('register existingUser: %s',JSON.stringify(user));
    if (user) {
      res.json(ErrorNoEnums.USER_ALREADY_EXISTS);
    }else{
      hashPassword(password).then(hashedPassword => {
        logger.info('register hashedPassword: %s',hashedPassword);
        User.create({ username, password:hashedPassword,status:UserStatus.ACTIVE }).then(user => {
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
    const { username, password } = req.body;
    logger.info(`login request ${username} ${password} `);
    await User.findOne({ where: { username : username } }).then(user => {
      logger.info('user: %s', JSON.stringify(user))
      if (!user) {
        return res.json(ErrorNoEnums.USER_NOT_FOUND);
      }

      if (!validatePassword(user, password)) {
        return res.json(ErrorNoEnums.INVALID_PHONE_OR_PASSWORD);
      }
      //查询用户的权限和资源
      roles.findAll({where:{user_id:user.id}}).then(roles => {
        try{
          let roleNames = roles.map(role => role.name);
          redis.set(`user_roles:${user.id}`,roleNames);
          roles.forEach(role => {
            let resources = JSON.parse(role.resources);
            let permissions = JSON.parse(role.permissions);
            acl.allow([role.name], resources, permissions);
          });
        }catch(error){
          throw new Error('parse roles failed %s',error.message);
        }
      });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return  res.json({
        ...ErrorNoEnums.LOGIN_SUCCESS,
        data: {
          accessToken: token
        }
      });
    }).catch(error => {
      logger.error(`登录失败 ${error.message}`);
      return res.json( ErrorNoEnums.UNEXPECTED_ERROR);
    })
  } catch (error) {

  }
};

exports.getProfile = async (req, res) => {
  res.json({
    ...ErrorNoEnums.SUCCESS,
    data: {
      codes:  ['AC_100100', 'AC_100110', 'AC_100120', 'AC_100010']
    }
  });
};

exports.getCodes = async (req, res) => {
      res.json({
        ...ErrorNoEnums.SUCCESS,
        data: {
          codes:  ['AC_100100', 'AC_100110', 'AC_100120', 'AC_100010']
        }
      });
};

