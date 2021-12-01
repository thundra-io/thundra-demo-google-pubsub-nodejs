const { MONGODB_URL } = require('../config');

const Mongoose = require("mongoose");

Mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = Mongoose.connection;
connection.on("error", () => {
    console.error("Connection can not be established with mongodb")
});

connection.once("open", () => {
    console.log("Connection established with mongodb.");
});

module.exports = Mongoose;