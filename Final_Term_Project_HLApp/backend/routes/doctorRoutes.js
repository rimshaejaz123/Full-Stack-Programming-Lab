// Placeholder
const express = require("express");
const router = express.Router();
const { createDoctor, getDoctors, deleteDoctor } = require("../controllers/doctorController");

const protect = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Only Admins can create or delete a doctor
router.post("/", protect, roleMiddleware("admin"), createDoctor);
router.delete("/:id", protect, roleMiddleware("admin"), deleteDoctor);

// Any authenticated user (Admin, Doctor, Patient) can view the doctor list
router.get("/", protect, getDoctors);

module.exports = router;