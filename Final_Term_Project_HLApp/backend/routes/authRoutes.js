const express = require("express");
const router = express.Router();

// The names here now perfectly match the controller
const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;