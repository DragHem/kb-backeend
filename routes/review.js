const express = require("express");

const reviewRouter = express.Router();

const {
  addReview,
  addCommentToReview,
} = require("../controllers/review.controller");

reviewRouter.post("/", async (req, res) => {
  const { text, grade, id } = req.body;
  const { name } = req.user;

  try {
    addReview(text, grade, id, name);
    res.json("Review added");
  } catch (e) {
    res.json(e.message);
  }
});

reviewRouter.post("/addcomment", (req, res) => {
  const { text, productId, reviewId } = req.body;
  const { name } = req.user;

  try {
    addCommentToReview(text, productId, reviewId, name);
    res.json("Comment added");
  } catch (e) {
    res.json(e.message);
  }
});

module.exports = {
  reviewRouter,
};
