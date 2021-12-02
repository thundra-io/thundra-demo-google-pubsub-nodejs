const Mongoose = require("../modules/mongoose");

const collectionName = "stockmovement";

const { Schema } = Mongoose;
const { ObjectId } = Schema.Types;

const stockLogSchema = Mongoose.Schema({
    product: { type: ObjectId },
    count: { type: Number },
}, { timestamps: true, versionKey: false });

const StockMovementModel = Mongoose.model(collectionName, stockLogSchema);

module.exports = StockMovementModel;