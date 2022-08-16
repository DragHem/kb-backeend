const { Schema } = require("mongoose");

const { commentSchema } = require("./comment.model");

const reviewSchema = new Schema({
  date: { type: Date, default: Date.now, required: true },
  text: { type: String, required: true },
  grade: { type: Number, min: 1, max: 5 },
  userName: String,
  comments: [commentSchema],
});

module.exports = {
  reviewSchema,
};
