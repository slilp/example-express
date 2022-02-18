const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: String,
    symbol: String,
    ref: String,
    type: {
      type: String,
      enum: ["crypto", "set"],
      default: "crypto",
    },
    rank: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("asset", schema);
