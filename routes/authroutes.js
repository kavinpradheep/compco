const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authcon");
const { login } = require("../controllers/authcon");
const {verifyOtp} = require("../controllers/authcon");

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
module.exports = router;
