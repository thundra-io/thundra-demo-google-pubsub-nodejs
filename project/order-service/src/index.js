// process.env['THUNDRA_AGENT_APPLICATION_NAME'] = process.env.npm_package_name;
// process.env['THUNDRA_AGENT_REPORT_REST_BASEURL'] = 'https://collector.thundra.me/v1';
// process.env['THUNDRA_APIKEY'] = '01aa7209-fc9e-4efa-81de-9c2c7e975f23'
//process.env['thundra_agent_debug_enable'] = true;

// const abc = {"type":"FilteringSpanListener","config":{"listener":{"type":"ErrorInjectorSpanListener","config":{"errorType":"ChaosError","errorMessage":"Google PubSub Chaos Injected!","injectPercentage":100}},"filters":[{"className":"Google-PubSub"}]}};
// process.env['THUNDRA_AGENT_TRACE_SPAN_LISTENERCONFIG']=JSON.stringify(abc);
// process.env['THUNDRA_DEV'] = 'true';

//process.env['THUNDRA_APIKEY'] = '333397b2-8ee0-4c74-b001-108c1dc283d4'
// process.env['THUNDRA_AGENT_TRACE_INSTRUMENT_TRACEABLECONFIG'] = '*.*.*[traceLineByLine=true]'
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


