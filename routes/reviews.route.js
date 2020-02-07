const express = require("express");
const { getReviews, getReview } = require("../controllers/reviews.controller");
const router = express.Router({ mergeParams: true });

const Review = require("../models/Review.model");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth.middlewares");

router
  .route("/")
  .get(
    advancedResults(Review, { path: "bootcamp", select: "name description" }),
    getReviews
  );

router.route("/:id").get(getReview);

module.exports = router;
