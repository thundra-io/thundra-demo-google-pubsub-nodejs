module.exports = {
    MONGODB_URL: process.env['MONGODB_URL'] ? 
    'mongodb://stockmovementservice:stockmovementservice123456@' + process.env['MONGODB_URL'] + ':27017/stockmovementdb' : '',
    GOOGLE_PROJECT_ID: process.env['GOOGLE_PROJECT_ID'] || 'thundra-pubsub',
    GOOGLE_API_ENDPOINT: process.env['GOOGLE_API_ENDPOINT'] || 'https://localhost:8432',
    GOOGLE_PUBSUB_STOCK_MOVEMENT_TOPIC: process.env['GOOGLE_PUBSUB_STOCK_MOVEMENT_TOPIC'] 
    || 'stock-movement-topic',
    GOOGLE_PUBSUB_STOCK_MOVEMENT_SUBSCRIPTION_NAME: process.env['GOOGLE_PUBSUB_STOCK_MOVEMENT_SUBSCRIPTION_NAME'] 
    || 'stock-movement-topic-subscription',
}