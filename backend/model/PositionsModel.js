

const { model } = require("mongoose");
const path = require('path');
const { PositionsSchema } = require(path.resolve(__dirname, 'schemas', 'PositionsSchema'));

const PositionsModel = model("position", PositionsSchema);

module.exports = { PositionsModel };
