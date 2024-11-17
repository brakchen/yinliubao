
require('dotenv').config();
const logger = require('./middleware/logger');
const cors = require('cors');
const redis = require('./config/redis');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var shortLinkRouter = require('./routes/shortLink');

const errorHandler = require('./middleware/errorHandler');



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

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/shortLink', shortLinkRouter);

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
