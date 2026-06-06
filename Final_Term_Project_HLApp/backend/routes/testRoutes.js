const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const roleMiddleware = require(
  "../middleware/roleMiddleware"
);

router.get(
  "/admin",
  protect,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      message:
        "Welcome Admin Dashboard"
    });
  }
);

router.get(
  "/doctor",
  protect,
  roleMiddleware("doctor"),
  (req, res) => {
    res.json({
      message:
        "Welcome Doctor Dashboard"
    });
  }
);

router.get(
  "/patient",
  protect,
  roleMiddleware("patient"),
  (req, res) => {
    res.json({
      message:
        "Welcome Patient Dashboard"
    });
  }
);

module.exports = router;