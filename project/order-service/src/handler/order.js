const OrderService = require('../service/order');

const healthHandler = async (ctx, next) => { 
    ctx.body = { status: 'ok' };
}

const cancelOrderHandler = async (ctx, next) => {
    try {
        const result = await OrderService.cancelOrder(ctx.params.orderId);
        ctx.body = { result }; 
    } catch (error) {
        console.error(err);
        ctx.body = { result: false }; 
    }
}

module.exports = {
    healthHandler,
    cancelOrderHandler,
}