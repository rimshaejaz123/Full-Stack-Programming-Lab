const Treatment = require('../models/Treatment');

exports.addTreatmentRecord = async (req, res) => {
    try {
        const { appointmentId, patientId, bloodPressure, weight, temperature, diagnosis, treatmentPlan, followUpDate, status } = req.body;

        const newTreatment = new Treatment({
            appointment: appointmentId,
            patient: patientId,
            doctor: req.user.id,
            bloodPressure, weight, temperature,
            diagnosis, treatmentPlan, followUpDate, status
        });

        await newTreatment.save();
        res.status(201).json({ success: true, message: 'Treatment logged successfully', treatment: newTreatment });
    } catch (error) {
        console.error("Treatment Error:", error);
        res.status(500).json({ success: false, message: 'Server error saving treatment.' });
    }
};

exports.getPatientHistory = async (req, res) => {
    try {
        // Patients get their own history; Doctors get specific patient history
        const query = req.user.role === 'patient' ? { patient: req.user.id } : { patient: req.params.patientId };
        const treatments = await Treatment.find(query)
            .populate('doctor', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, treatments });
    } catch (error) {
        console.error("History Error:", error);
        res.status(500).json({ success: false, message: 'Server error retrieving history.' });
    }
};