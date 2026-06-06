const express = require("express");
const router = express.Router();
const { getPatientProfile, updatePatientProfile } = require("../controllers/patientController");
const protect = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.route("/profile")
  .get(protect, roleMiddleware("patient"), getPatientProfile)
  .put(protect, roleMiddleware("patient"), updatePatientProfile);

module.exports = router;