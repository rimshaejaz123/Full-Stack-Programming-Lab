const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // Physical Checkup Records
    bloodPressure: { type: String },
    weight: { type: String },
    temperature: { type: String },
    
    // Treatment Details
    diagnosis: { type: String, required: true },
    treatmentPlan: { type: String, required: true },
    
    // Follow-up & Status
    followUpDate: { type: String },
    status: { type: String, enum: ['Ongoing', 'Completed'], default: 'Ongoing' }
}, { timestamps: true });

module.exports = mongoose.model('Treatment', treatmentSchema);