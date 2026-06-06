const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addTreatmentRecord, getPatientHistory } = require('../controllers/treatmentController');

// Ensure app.use('/api/treatments', require('./routes/treatmentRoutes')); is in server.js
router.post('/add', authMiddleware, addTreatmentRecord);
router.get('/history/:patientId', authMiddleware, getPatientHistory); // For Doctor
router.get('/my-history', authMiddleware, getPatientHistory); // For Patient

module.exports = router;