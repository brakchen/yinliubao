const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');


const { combine, timestamp, printf, colorize, errors,splat } = winston.format;

const myFormat = combine(
  colorize(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  splat(),
  printf(({ level, message, timestamp, stack, meta }) => {
      // 如果有额外的参数（如 meta），则将其追加到日志消息中
      let logMessage = `${timestamp} ${level}: ${stack || message}`;
      if (meta && Object.keys(meta).length > 0) {
          logMessage += ` ${JSON.stringify(meta)}`;
      }
      return logMessage;
  })
);

const businessTransport = new winston.transports.DailyRotateFile({
  filename: path.join(__dirname, '../logs/business-%DATE%.log'),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info'
});

const errorTransport = new winston.transports.DailyRotateFile({
  filename: path.join(__dirname, '../logs/error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'error',
});

const logger = winston.createLogger({
  format: combine(
    timestamp(),
    errors({ stack: true }),
    myFormat
  ),
  transports: [
    businessTransport,
    errorTransport
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: combine(
      colorize(),
      timestamp(),
      myFormat
    )
  }));
}

module.exports = logger;

