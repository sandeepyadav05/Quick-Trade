const { model } = require("mongoose");
const path = require('path');
const { OrdersSchema } = require(path.resolve(__dirname, 'schemas', 'OrdersSchema'));

const OrdersModel = model("order", OrdersSchema);

module.exports = { OrdersModel };
