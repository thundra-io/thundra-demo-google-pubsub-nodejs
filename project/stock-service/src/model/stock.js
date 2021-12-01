const Mongoose = require("../modules/mongoose");

const collectionName = "stock";

const { Schema } = Mongoose;
const { ObjectId } = Schema.Types;

const stockSchema = Mongoose.Schema({
    product: { type: ObjectId, unique: true, sparse: true },
    count: { type: Number },
}, { timestamps: true, versionKey: false });

const StockModel = Mongoose.model(collectionName, stockSchema);

module.exports = StockModel;