require('dotenv').config();
const logger = require('./middleware/logger');
const cors = require('cors');
const redis = require('./config/redis');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const ErrorNoEnums = require('./datadict/enums/errorNoEnums');

var indexRouter = require('./routes');
var usersRouter = require('./routes/users');
var externalRouter = require('./routes/external');
var shortLinkRouter = require('./routes/shortLink');
const errorHandler = require('./middleware/errorHandler');
var { expressjwt: jwt } = require("express-jwt");
var app = express();
app.use(cors());
// 设置 Morgan 记录请求日志到文件
app.use(morgan('combined', {
  write: (message) => {
    logger.info(message);
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandler);
// 验证token
app.use(jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  onExpired: function(req, res, next){
    return res.json=ErrorNoEnums.EXPIRED_TOKEN ;
  }
}).unless({
  path: [
    {url:/\/ylb\/external\/.*/,method:['GET','POST']},
    {url:'/health',method:['GET','POST']},
    {url:'/api/users/login',method:['GET','POST']},
    {url:'/api/users/register',method:['GET','POST']}
  ]
}));
//权限校验
const acl = require('acl');
const aclInstance = new acl(new acl.redisBackend(redis,
  'acl:'
));
//定义角色和资源
// const roles = {
//   admin:['admin'],
//   user:['user']
// };
// const resources = {
//   admin: {
//     resources: ['/api/users', '/api/shortLink'],
//     permissions: ['create', 'read', 'update', 'delete']
//   },
//   user: {
//     resources: ['/api/shortLink'],
//     permissions: ['read']
//   }
// };
//初始化acl
// acl.allow(roles.admin,resources.admin.resources,resources.admin.permissions);
// acl.allow(roles.user,resources.user.resources,resources.user.permissions);

// 用户认证中间件
async function authMiddleware(req, res, next) {
  const userId = req.auth.userId;  
  if (!userId){
    return res.status(403).send('User not authenticated');
  }
  //根据token获取用户的角色和资源

  // 获取用户角色
  redis.smembers(`user_roles:${userId}`, async (err, roleNames) => {
    if (err || roleNames.length === 0) return res.status(403).send('User roles not found');
    const allAllowed = roleNames.every(roleName => {
      return acl.isAllowed(roleName, req.originalUrl, req.method);
    });
    if (allAllowed) {
      next();
    } else {
      res.status(403).send('Permission denied');
    }

  });


  aclInstance.isAllowed(userId, req.originalUrl, req.method, (err, allowed) => {
    if (err){
      return res.status(403).send('User roles not found');
    } 
    if (allowed) {
      next();
    } else {
      return res.status(403).send('Permission denied');
    }
  });
}
app.use(authMiddleware);
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/shortLink', shortLinkRouter);
app.use('/ylb/external', externalRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  logger.warn('404 not found');
  next(createError(404));
});

// error handler
app.use(errorHandler);


// app.listen(3000, () => {
//   logger.info('Server is running on port 3000');
// });


module.exports = app;
