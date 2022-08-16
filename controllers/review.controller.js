const { reviewModel } = require("../model/review.model");
const { productModel: Product } = require("../model/product.model");
const { commentModel } = require("../model/comment.model");

const addReview = (text, grade, id, userName) => {
  const review = new reviewModel({ text, grade, userName });
  Product.findOne({ _id: id }, (err, product) => {
    if (err) throw err;
    if (!product) return "Product not found.";

    product.reviews.push(review);
    product.save();
  });
};

const addCommentToReview = (text, productId, reviewId, userName) => {
  const comment = new commentModel({ text, userName });
  Product.findOne({ _id: productId }, (err, product) => {
    if (err) throw err;
    if (!product) return "Product not found.";

    product.reviews.id(reviewId).comments.push(comment);
    product.save();
  });
};

module.exports = {
  addReview,
  addCommentToReview,
};
