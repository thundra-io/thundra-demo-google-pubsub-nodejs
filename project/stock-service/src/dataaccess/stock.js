const StockModel = require('../model/stock');
const { getObjectId } = require('../helper');

const isProductExist = async (productId) => {

    return (
        StockModel
          .countDocuments({
            product: getObjectId(productId),
          })
          .lean()
          .exec()
    );
} 

const getStockByProductId = async (productId) => {

    return (await StockModel.findOne({
        product: getObjectId(productId),
    }).select({ product:1, count: 1 })
    .lean()
    .exec());
}

const updateProductCount = async (product, count) => {

    return (await StockModel.findOneAndUpdate({
        product: getObjectId(product),
        }, {
            $inc: {
                count: +count
            },
        },{
            new: true,
        })
    .select({ _id: 0, product:1, count: 1 })
    .lean()
    .exec());
}

module.exports = {
    isProductExist,
    getStockByProductId,
    updateProductCount,
}