const OrderDataAccess = require('../dataaccess/order')
const PubSub = require('../helper/pubsub');
const Helper = require('../helper');
const { GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC } = require('../config')
const Redlock = require('../modules/redlock');

const cancelOrder = async (orderId) => {
    
    const orderExist = await OrderDataAccess.isOrderExist(orderId);
    if (!orderExist) {
        return false;
    }

    const lockKey = Helper.generareIdFrom(orderId);
    const lock =  await Redlock.lock(lockKey, 3000);
    try {
        const result = await OrderDataAccess.cancelOrder(orderId);
    
        if (result) {
            const topic = await PubSub.getTopic(GOOGLE_PUBSUB_ORDER_CANCELATION_TOPIC);        
            await topic.publishMessage({ data: Buffer.from(JSON.stringify(result)) });
        } 
    
        return {
            status: result !== null,
            orderId,
        };
    } catch (error) {
        console.error(error);
    } finally {
        try {
            await lock.unlock();
        } catch (error) {
            console.error(err);
        }
    }

    return {
        status: false,
        orderId,
    };
}

module.exports = {
    cancelOrder,
}