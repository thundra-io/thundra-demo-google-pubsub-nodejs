const PubSub = require('../helper/pubsub');
const { GOOGLE_PUBSUB_STOCK_MOVEMENT_TOPIC } = require('../config');
const Helper = require('../helper');
const StockDataAccess = require('../dataaccess/stock');
const Redlock = require('../modules/redlock');

const getProductStock = async (productId) => {
    return StockDataAccess.getStockByProductId(productId);
}

const releaseOrderStocks = async (cancelationMessage) => {
    if (!cancelationMessage || !cancelationMessage.basket || !cancelationMessage.basket.products) {
        return;
    }

    for (const productItem of cancelationMessage.basket.products) {
        const productId = productItem.product;
        const productExist = await StockDataAccess.isProductExist(productId);
        if (!productExist) {
            continue;
        }

        const lockKey = Helper.generareIdFrom(productId);
        const lock = await Redlock.lock(lockKey, 3000);
        try {
            const updateResult = await StockDataAccess.updateProductCount(productId, productItem.count);
            if (updateResult) {
                const topic = await PubSub.getTopic(GOOGLE_PUBSUB_STOCK_MOVEMENT_TOPIC);
                const dataBuffer = Buffer.from(JSON.stringify(updateResult));
            
                await topic.publishMessage({ data: dataBuffer });
            }
        } catch (error) {
            console.error(error)
        } finally {
            await lock.unlock();
        }
    }
}

module.exports = {
    getProductStock,
    releaseOrderStocks,
}