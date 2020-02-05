const express = require("express");
/* Controller Methods for Routes */ const {
  register,
  login,
  getMe
} = require("../controllers/auth.controller");
const router = express.Router();

const { protect } = require("../middleware/auth.middlewares");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);

module.exports = router;
