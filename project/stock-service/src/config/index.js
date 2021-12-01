module.exports = {
    MONGODB_URL: process.env['MONGODB_URL'] ? 
    'mongodb://stockservice:stockservice123456@' + process.env['MONGODB_URL'] + ':27017/stockdb' : '',
    GOOGLE_PROJECT_ID: process.env['GOOGLE_PROJECT_ID'] || 'thundra-pubsub',
    GOOGLE_API_ENDPOINT: process.env['GOOGLE_API_ENDPOINT'] || 'https://localhost:8432',
    GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC: process.env['GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC'] || 'order-cancelation-topic',
    GOOGLE_PUBSUB_ORDER_CANCELATION_SUBSCRIPTION_NAME: process.env['GOOGLE_PUBSUB_ORDER_CANCELATION_SUBSCRIPTION_NAME'] 
        || 'order-cancelation-topic-subscription',
    GOOGLE_PUBSUB_STOCK_MOVEMENT_TOPIC: process.env['GOOGLE_PUBSUB_STOCK_MOVEMENT_TOPIC'] 
    || 'stock-movement-topic',
    REDIS_URL: process.env['REDIS_URL'] || 'localhost',
    REDIS_PORT: process.env['REDIS_PORT'] || 6379,
}