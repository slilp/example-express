const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    buyDate: { type: Date, default: Date.now },
    sellDate: { type: Date },
    buyPrice: { type: Number, default: 0 },
    sellPrice: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "asset",
    },
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wallet",
    },
    indicators: [{ type: mongoose.Types.ObjectId, ref: "transaction" }],
    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("transaction", schema);
