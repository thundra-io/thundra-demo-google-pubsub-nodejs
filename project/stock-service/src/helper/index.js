const Mongoose = require("../modules/mongoose");
const { ObjectId } = Mongoose.Types;
const { v4: uuidv4 } = require('uuid');
const { v5: uuidv5 } = require('uuid');
const { SERVICE_UUID_CONST } = require('../constant');

const generateId = () => {
    return uuidv4();
}

const generareIdFrom = (value) => {
    return uuidv5(value, SERVICE_UUID_CONST);
}

const generateObjectId = () => {
    return new ObjectId();
}

const getObjectId = (idStr) => {
    return new ObjectId(idStr);
}

module.exports = {
    generateId,
    generareIdFrom,
    generateObjectId,
    getObjectId,
}