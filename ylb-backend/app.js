var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


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
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  logger.info('404 not found');
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
