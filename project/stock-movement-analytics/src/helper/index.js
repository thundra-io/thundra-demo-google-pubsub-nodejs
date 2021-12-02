const Mongoose = require("../modules/mongoose");
const { ObjectId } = Mongoose.Types;

const generateObjectId = () => {
    return new ObjectId();
}

const getObjectId = (idStr) => {
    return new ObjectId(idStr);
}

module.exports = {
    generateObjectId,
    getObjectId,
}