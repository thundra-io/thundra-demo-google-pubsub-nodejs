const StockService = require('../service/stock');

const healthHandler = async (ctx, next) => { 
    ctx.body = { status: 'ok' };
}

const getProductStock = async (ctx, next) => {
    try {
        let result = {};
        const productId = ctx.params.productId;
        if (!productId) {
            result = await StockService.getProductStock(productId);
        }

        ctx.body = result; 
    } catch (error) {
        console.error(err);
        ctx.body = { result: false }; 
    }
}

const orderCancellationMessageHandler = async (message) => {
    try {
        const messageContent = JSON.parse(`${message.data}`);
        await StockService.releaseOrderStocks(messageContent);
        message.ack();
    } catch (error) {
        console.error(err);
        message.nack();
    }
};

module.exports = {
    getProductStock,
    healthHandler,
    orderCancellationMessageHandler,
}