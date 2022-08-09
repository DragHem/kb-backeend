const mongoose = require("mongoose");

const product = new mongoose.Schema({
  name: String,
  price: Number,
  count: Number,
  desc: String,
  image_url: [String],
  category: [String],
});

module.exports = mongoose.model("Product", product);
