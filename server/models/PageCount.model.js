const mongoose = require("mongoose");

const CountSchema = new mongoose.Schema(
  {
    stripNumber: Number,
    count: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("strip", CountSchema);
