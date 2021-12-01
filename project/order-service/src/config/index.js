module.exports = {
    MONGODB_URL: process.env['MONGODB_URL'] ? 
    'mongodb://orderservice:orderservice123456@' + process.env['MONGODB_URL'] + ':27017/orderdb' : '',
    GOOGLE_PROJECT_ID: process.env['GOOGLE_PROJECT_ID'] || 'thundra-pubsub',
    GOOGLE_API_ENDPOINT: process.env['GOOGLE_API_ENDPOINT'] || 'https://localhost:8432',
    GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC: process.env['GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC'] || 'order-cancelation-topic',
    REDIS_URL: process.env['REDIS_URL'] || 'localhost',
    REDIS_PORT: process.env['REDIS_PORT'] || 6379
}