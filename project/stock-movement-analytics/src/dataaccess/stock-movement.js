const StockMovementModel = require('../model/stock-log'); 

const getStockMovements = async (productId) => {
    return (
        StockMovementModel
          .find({ product: productId })
          .lean()
          .exec()
      );
}

const createStockMovement = async (log) => {
    return (
        await StockMovementModel.create({...log})
    );
}

module.exports = {
    getStockMovements,
    createStockMovement,
}