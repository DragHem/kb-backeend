const { Schema, model } = require("mongoose");

const commentModel = new Schema({
  date: { type: Date, default: Date.now, required: true },
  text: { type: String, required: true },
  userName: String,
});

module.exports = {
  commentModel: model("Comment", commentModel),
  commentSchema: commentModel,
};
