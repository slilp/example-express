const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: String,
    entitlements: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("role", schema);
