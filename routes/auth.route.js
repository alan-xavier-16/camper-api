const express = require("express");
/* Controller Methods for Routes */ const {
  register,
  login,
  getMe,
  forgotPassword
} = require("../controllers/auth.controller");
const router = express.Router();

const { protect } = require("../middleware/auth.middlewares");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);
router.route("/forgotpassword").post(forgotPassword);

module.exports = router;
