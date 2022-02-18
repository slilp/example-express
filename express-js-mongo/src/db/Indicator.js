const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: String,
    symbol: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("indicator", schema);
