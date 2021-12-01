const StockMovementDataAccess = require('../dataaccess/stock-movement')

const getStockMovements = async (productId) => {
    return StockMovementDataAccess.getStockMovements(productId);
}

const handleStockMovement = async (message) => {
    if (!message) {
        return;
    }
    
    return StockMovementDataAccess.createStockMovement(message);
}

module.exports = {
    getStockMovements,
    handleStockMovement,
}