const { model } = require("mongoose");
const path = require('path');

const { HoldingsSchema } = require(path.resolve(__dirname, 'schemas', 'HoldingsSchema'));


const HoldingsModel = model("holding", HoldingsSchema);

module.exports = { HoldingsModel };
