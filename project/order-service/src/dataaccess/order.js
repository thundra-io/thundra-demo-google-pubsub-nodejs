const OrderModel = require('../model/order');
const { getObjectId } = require('../helper/index');
const { ORDER_STATUSES } = require('../constant');

const isOrderExist = async (orderId) => {

    return (
        OrderModel
          .countDocuments({
            _id: getObjectId(orderId),
            status: { $lte: ORDER_STATUSES.PREPARING },
          })
          .lean()
          .exec()
    );
} 

const cancelOrder = async (orderId) => {

    return (await OrderModel.findOneAndUpdate({
        _id: getObjectId(orderId),
        status: { $lte: ORDER_STATUSES.PREPARING },
    }, {
        $set: {
            status: ORDER_STATUSES.CANCELED_CLIENT,
        },
    },{
        new: true,
    })
    .select({ "_id": 1, "basket": 1, "client": 1, "createdAt": 1, "updatedAt": 1})
    .lean()
    .exec());
}

module.exports = {
    isOrderExist,
    cancelOrder,
}