const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// CRITICAL FIX: All four functions must be listed here
const { 
    bookAppointment, 
    getPatientAppointments, 
    getDoctorAppointments, 
    updateAppointmentStatus 
} = require('../controllers/appointmentController');

// Patient Routes
router.post('/book', authMiddleware, bookAppointment);
router.get('/my-appointments', authMiddleware, getPatientAppointments);

// Doctor Routes
router.get('/doctor-appointments', authMiddleware, getDoctorAppointments);
router.put('/:id/status', authMiddleware, updateAppointmentStatus);

module.exports = router;