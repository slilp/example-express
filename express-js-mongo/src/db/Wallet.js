const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: String,
    channel: String,
    account: { type: mongoose.Types.ObjectId, ref: "account" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("wallet", schema);
