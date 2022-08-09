const mongoose = require("mongoose");

const product = new mongoose.Schema({
  name: String,
  price: { type: Number, min: 0 },
  count: Number,
  desc: String,
  image_url: [String],
  category: [String],
});

module.exports = mongoose.model("Product", product);
