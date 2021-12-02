const thundra = require('@thundra/core');
thundra.init();

const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const OrderHandler = require('./handler/order');
const PubSub = require('./helper/pubsub');
const { GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC } = require('./config');

(async() => {
    await PubSub.prepareTopic(GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC)

    const app = new Koa();
    const router = new Router();
    
    router.get('/order/health', OrderHandler.healthHandler);
    router.delete('/order/cancel/:orderId', OrderHandler.cancelOrderHandler);
    
    app.use(router.routes());
    app.use(cors());
    app.listen(8080);
    
})().catch(error => {
    console.log(error)
});


