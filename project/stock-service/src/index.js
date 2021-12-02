const thundra = require('@thundra/core');
thundra.init();

const {
    GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC,
    GOOGLE_PUBSUB_STOCK_MOVEMENT_TOPIC,
    GOOGLE_PUBSUB_ORDER_CANCELATION_SUBSCRIPTION_NAME,
} = require('./config');
const StockHandler = require('./handler/stock');
const PubSub = require('./helper/pubsub');
const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');

(async() => {
    await PubSub.prepareTopic(GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC);
    await PubSub.prepareTopic(GOOGLE_PUBSUB_STOCK_MOVEMENT_TOPIC);

    const subscription = await PubSub.getSubscription(
        GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC,
        GOOGLE_PUBSUB_ORDER_CANCELATION_SUBSCRIPTION_NAME
    );

    subscription.on(`message`, StockHandler.orderCancellationMessageHandler);

    const app = new Koa();
    const router = new Router();
    
    router.get('/stock/health', StockHandler.healthHandler);
    router.get('/stock/:productId', StockHandler.getProductStock);
    
    app.use(router.routes());
    app.use(cors());
    app.listen(8080);
})().catch(error => {
    console.log(error)
});
