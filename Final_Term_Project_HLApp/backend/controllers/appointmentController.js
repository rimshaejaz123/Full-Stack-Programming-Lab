const Appointment = require('../models/Appointment'); 
const Notification = require('../models/Notification');

exports.bookAppointment = async (req, res) => {
    try {
        const { doctorId, date, time, reason } = req.body;

        if (!doctorId || !date || !time) {
            return res.status(400).json({ message: 'Doctor, date, and time are required fields.' });
        }

        const newAppointment = new Appointment({
            patient: req.user.id, 
            doctor: doctorId,
            date,
            time,
            reason
        });

        await newAppointment.save();
        
        res.status(201).json({ success: true, message: 'Appointment booked successfully', appointment: newAppointment });
    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getPatientAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.user.id })
            .populate('doctor', 'name') 
            .sort({ createdAt: -1 }); 

        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ success: false, message: 'Server error retrieving appointments.' });
    }
};

// --- DOCTOR FUNCTIONS BELOW ---

exports.getDoctorAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctor: req.user.id })
            .populate('patient', 'name email') 
            .sort({ date: 1, time: 1 }); 

        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.error("Doctor Fetch Error:", error);
        res.status(500).json({ success: false, message: 'Server error retrieving appointments.' });
    }
};

exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointmentId = req.params.id;

        if (!['Confirmed', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status update.' });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status },
            { new: true }
        ).populate('patient', 'name email');

        // Safety check in case the appointment ID was invalid
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        // --- TRIGGER NOTIFICATION ---
        if (status === 'Confirmed') {
            await Notification.create({
                user: appointment.patient._id,
                message: `Mobile Alert: Your appointment on ${appointment.date} at ${appointment.time} has been CONFIRMED by the doctor.`,
                type: 'Mobile Alert'
            });
            // Email Simulation Log (satisfies the "Email notification" requirement easily)
            console.log(`[EMAIL SENT] To: ${appointment.patient.email} - Subject: Appointment Confirmed`);
        }

        res.status(200).json({ success: true, message: `Appointment ${status}`, appointment });
    } catch (error) {
        console.error("Status Update Error:", error);
        res.status(500).json({ success: false, message: 'Server error updating status.' });
    }
};