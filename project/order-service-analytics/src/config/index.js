module.exports = {
    GOOGLE_PROJECT_ID: process.env['GOOGLE_PROJECT_ID'] || 'thundra-pubsub',
    GOOGLE_API_ENDPOINT: process.env['GOOGLE_API_ENDPOINT'] || 'https://localhost:8432',
    GOOGLE_API_HOST: process.env['GOOGLE_API_ENDPOINT'] || 'localhost',
    GOOGLE_API_PORT: process.env['GOOGLE_API_PORT'] || 8432, 
    GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC: process.env['GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC'] || 'order-cancelation-topic',
    GOOGLE_PUBSUB_ORDER_CANCELATION_SUBSCRIPTION_NAME: process.env['GOOGLE_PUBSUB_ORDER_CANCELATION_ANALYTIC_SUBSCRIPTION_NAME'] 
        || 'order-cancelation-topic-stock-analytic-subscription',
}