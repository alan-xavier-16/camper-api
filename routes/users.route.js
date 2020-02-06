const express = require("express");
/* Controller Methods for Routes */ const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/users.controllers");
const router = express.Router();

const User = require("../models/User.model");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth.middlewares");

router.use(protect);
router.use(authorize("admin"));

router
  .route("/")
  .get(advancedResults(User), getUsers)
  .post(createUser);
router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
