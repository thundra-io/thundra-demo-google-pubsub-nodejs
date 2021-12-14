const { 
    GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC,
    GOOGLE_PUBSUB_ORDER_CANCELATION_SUBSCRIPTION_NAME 
} = require('./config');
const PubSub = require('./helper/pubsub');
const OrderCancellationPuller = require('./service/order-analytic-puller');

process.env['THUNDRA_AGENT_APPLICATION_NAME'] = process.env.npm_package_name !== undefined 
    ? process.env.npm_package_name !== undefined : 'Order-Service-Analytics';
process.env['THUNDRA_AGENT_REPORT_REST_BASEURL'] = 'https://collector.thundra.us/v1';
process.env['THUNDRA_APIKEY'] = '7fe9ea2e-fd4a-4862-aa30-33e7ed49833e'

const thundra = require('@thundra/core');
thundra.init();

(async() => {
    await PubSub.prepareTopic(GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC)

    const subscription = await PubSub.getSubscription(
        GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC,
        GOOGLE_PUBSUB_ORDER_CANCELATION_SUBSCRIPTION_NAME
    );

    OrderCancellationPuller.init(7000);
    
})().catch(error => {
    console.log(error)
});
