const Patient = require("../models/Patient");
const User = require("../models/User");

// @desc    Get patient profile
// @route   GET /api/patients/profile
// @access  Private (Patient only)
const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id }).populate("user", "name email");
    
    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update patient profile
// @route   PUT /api/patients/profile
// @access  Private (Patient only)
const updatePatientProfile = async (req, res) => {
  try {
    const { age, gender, contactNumber, address, medicalHistory } = req.body;

    const patient = await Patient.findOneAndUpdate(
      { user: req.user.id },
      { age, gender, contactNumber, address, medicalHistory },
      { new: true, runValidators: true }
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPatientProfile, updatePatientProfile };

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await User.find({ role: 'patient' }).select('-password');
        res.status(200).json({ success: true, patients });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Patient deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};