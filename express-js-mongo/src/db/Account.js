const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
    wallets: [{ type: mongoose.Types.ObjectId, ref: "wallet" }],
    role: { type: mongoose.Types.ObjectId, ref: "role" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("account", schema);
