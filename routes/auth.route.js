const express = require("express");
/* Controller Methods for Routes */ const {
  register,
  login
} = require("../controllers/auth.controller");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
