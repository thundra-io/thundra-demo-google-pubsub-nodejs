const { 
    GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC,
    GOOGLE_PUBSUB_ORDER_CANCELATION_SUBSCRIPTION_NAME 
} = require('./config');
const PubSub = require('./helper/pubsub');
const OrderCancellationPuller = require('./service/order-analytic-puller');

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
