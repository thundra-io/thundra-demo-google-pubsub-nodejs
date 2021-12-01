const { 
    REDIS_URL,
    REDIS_PORT
} = require('../config');

const Redis = require("ioredis");
const Redlock = require('redlock');
 
const redlock = new Redlock(
    [new Redis(REDIS_PORT, REDIS_URL)],
    {
        retryCount: 10,
        retryDelay: 200,
        retryJitter: 200,
    }
);

module.exports = redlock