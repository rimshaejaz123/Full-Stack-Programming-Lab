const Prescription = require('../models/Prescription');

exports.createPrescription = async (req, res) => {
    try {
        const { appointmentId, patientId, medications, notes } = req.body;

        const newPrescription = new Prescription({
            appointment: appointmentId,
            doctor: req.user.id, // Logged-in doctor
            patient: patientId,
            medications,
            notes
        });

        await newPrescription.save();
        
        res.status(201).json({ 
            success: true, 
            message: 'Prescription added successfully', 
            prescription: newPrescription 
        });
    } catch (error) {
        console.error("Prescription Error:", error);
        res.status(500).json({ success: false, message: 'Server error saving prescription.' });
    }
};
exports.getPatientPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ patient: req.user.id })
            .populate('doctor', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, prescriptions });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error retrieving prescriptions.' });
    }
};