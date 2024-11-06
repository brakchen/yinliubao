const Redis = require('ioredis');
const logger = require('../middleware/logger');


const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';  // Fallback to default value if not set
logger.info('REDIS_PASSWORD: '+ REDIS_PASSWORD);


// Create a Redis client
const redis = new Redis({
  host: '101.43.176.206',  // Redis server address (default is localhost)
  port: 6379,        // Redis server port (default is 6379)
  password: REDIS_PASSWORD, // optional, if you have a password set
});

// Test Redis connection
redis.on('connect', () => {
    logger.info('Connected to Redis');
});

redis.on('error', (err) => {    
    logger.error('Redis error: ', err);
});

module.exports = redis;