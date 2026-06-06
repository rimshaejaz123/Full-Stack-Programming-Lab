const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// ONLY ONE IMPORT LINE HERE:
const { createPrescription, getPatientPrescriptions } = require('../controllers/prescriptionController');

router.post('/add', authMiddleware, createPrescription);
router.get('/my-prescriptions', authMiddleware, getPatientPrescriptions);

module.exports = router;