// process.env['THUNDRA_AGENT_APPLICATION_NAME'] = process.env.npm_package_name;
// process.env['THUNDRA_AGENT_REPORT_REST_BASEURL'] = 'https://collector.thundra.io/v1';
// process.env['THUNDRA_APIKEY'] = '333397b2-8ee0-4c74-b001-108c1dc283d4'
// process.env['thundra_agent_debug_enable'] = true;

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
