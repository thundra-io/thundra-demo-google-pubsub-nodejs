const thundra = require('@thundra/core');
thundra.init();

const { 
    GOOGLE_PUBSUB_STOCK_MOVEMENT_TOPIC,
    GOOGLE_PUBSUB_STOCK_MOVEMENT_SUBSCRIPTION_NAME 
} = require('./config');
const PubSub = require('./helper/pubsub');
const StockMovementService = require('./handler/stock-movement');
const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');

(async() => {
    await PubSub.prepareTopic(GOOGLE_PUBSUB_STOCK_MOVEMENT_TOPIC)

    const subscription = await PubSub.getSubscription(
        GOOGLE_PUBSUB_STOCK_MOVEMENT_TOPIC,
        GOOGLE_PUBSUB_STOCK_MOVEMENT_SUBSCRIPTION_NAME
    );

    subscription.on(`message`, StockMovementService.stockMovementMessageHandler);

    const app = new Koa();
    const router = new Router();
    
    router.get('/stockmovement/health', StockMovementService.healthHandler);
    router.get('/stockmovement/:productId', StockMovementService.getProductStockMovements);
    
    app.use(router.routes());
    app.use(cors());
    app.listen(8080);
})().catch(error => {
    console.log(error)
});
