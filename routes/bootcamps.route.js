const express = require("express");
/* Controller Methods for Routes */ const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require("../controllers/bootcamps.controller");
const router = express.Router();

// Include Other Resource Routers
const courseRouter = require("./courses.route");

/* Re-route to other resource routers */
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/")
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route("/:id/photo").put(bootcampPhotoUpload);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

module.exports = router;
