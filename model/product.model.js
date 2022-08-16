const { Schema, model } = require("mongoose");

const { reviewSchema } = require("./review.model");

const productModel = new Schema({
  name: { type: String, required: true },
  price: { type: Number, min: 0, required: true },
  count: { type: Number, min: 0 },
  desc: String,
  image_url: [String],
  category: { type: [String], index: true },
  reviews: [reviewSchema],
  userId: String,
});

module.exports = model("Product", productModel);
