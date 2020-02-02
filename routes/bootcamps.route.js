const express = require("express");
/* Controller Methods for Routes */ const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp
} = require("../controllers/bootcamps.controller");
const router = express.Router();

router
  .route("/")
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;