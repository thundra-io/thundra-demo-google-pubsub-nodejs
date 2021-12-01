const Mongoose = require("../modules/mongoose");
const { ORDER_STATUSES } = require('../constant');

const collectionName = "order";

const { Schema } = Mongoose;
const { ObjectId } = Schema.Types;

const orderSchema = Mongoose.Schema({
    basket: {
        products: [{
            product: { type: ObjectId },
            count: { type: Number },
        }]
    },
    status: { type: Number, default: ORDER_STATUSES.INCOMPLETE },
}, { timestamps: true, versionKey: false });

const OrderModel = Mongoose.model(collectionName, orderSchema);

module.exports = OrderModel;