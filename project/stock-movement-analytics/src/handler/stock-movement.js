const StockMovementService = require('../service/stock-movement'); 

const healthHandler = async (ctx, next) => { 
    ctx.body = { status: 'ok' };
}

const getProductStockMovements = async (ctx, next) => {
    try {
        let result = {};
        const productId = ctx.params.productId;
        if (productId) {
            result = await StockMovementService.getStockMovements(productId);
        }

        ctx.body = {
            result
        }; 
    } catch (error) {
        console.error(err);
        ctx.body = { result: false }; 
    }
}

const stockMovementMessageHandler = async (message) => {
    try {
        const messageContent = JSON.parse(`${message.data}`);
        console.log(messageContent);
        await StockMovementService.handleStockMovement(messageContent);
        message.ack()
    } catch (error) {
        console.error(err);
        message.nack()
    }
  ;
};

module.exports = {
    healthHandler,
    getProductStockMovements,
    stockMovementMessageHandler,
}