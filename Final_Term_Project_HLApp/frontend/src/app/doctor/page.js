"use client";
import { useState, useEffect } from 'react';

export default function DoctorDashboard() {
    const [appointments, setAppointments] = useState([]);
    
    // States for the prescription form
    const [activePrescriptionAppt, setActivePrescriptionAppt] = useState(null);
    const [medName, setMedName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [notes, setNotes] = useState('');
    
    // States for the treatment form
    const [activeTreatmentAppt, setActiveTreatmentAppt] = useState(null);
    const [vitals, setVitals] = useState({ bp: '', weight: '', temp: '' });
    const [plan, setPlan] = useState({ diagnosis: '', plan: '', followUp: '' });

    const fetchAppointments = async () => {
        const token = localStorage.getItem('token');
        if (!token) return window.location.href = '/login';

        try {
            const response = await fetch('http://localhost:5000/api/appointments/doctor-appointments', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) setAppointments(data.appointments || []);
        } catch (error) {
            console.error("Error loading appointments:", error);
        }
    };

    useEffect(() => { fetchAppointments(); }, []);

    const handleStatusUpdate = async (appointmentId, newStatus) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                alert(`Appointment ${newStatus}!`);
                fetchAppointments(); 
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handlePrescriptionSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        const payload = {
            appointmentId: activePrescriptionAppt._id,
            patientId: activePrescriptionAppt.patient._id,
            medications: [{ name: medName, dosage, frequency }],
            notes
        };

        try {
            const response = await fetch('http://localhost:5000/api/prescriptions/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Prescription saved successfully!');
                setActivePrescriptionAppt(null);
                setMedName(''); setDosage(''); setFrequency(''); setNotes('');
            }
        } catch (error) {
            console.error("Error saving prescription:", error);
        }
    };

    const handleTreatmentSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        const payload = {
            appointmentId: activeTreatmentAppt._id,
            patientId: activeTreatmentAppt.patient._id,
            bloodPressure: vitals.bp, weight: vitals.weight, temperature: vitals.temp,
            diagnosis: plan.diagnosis, treatmentPlan: plan.plan, followUpDate: plan.followUp
        };

        try {
            const response = await fetch('http://localhost:5000/api/treatments/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Treatment history updated!');
                setActiveTreatmentAppt(null);
                setVitals({ bp: '', weight: '', temp: '' });
                setPlan({ diagnosis: '', plan: '', followUp: '' });
            }
        } catch (error) {
            console.error("Error saving treatment:", error);
        }
    }; 

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-blue-600">Doctor Dashboard</h1>
                <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }} className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600">Logout</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">Patient Appointments</h2>
                
                {appointments.length === 0 ? (
                    <p className="text-gray-600">No appointments scheduled.</p>
                ) : (
                    <div className="space-y-4">
                        {appointments.map((apt) => (
                            <div key={apt._id} className="p-5 border border-gray-200 rounded-md bg-gray-50">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <p className="font-bold text-lg text-gray-800">Patient: {apt.patient?.name || "Unknown"}</p>
                                        <p className="text-sm text-gray-600">Date: {apt.date} | Time: {apt.time}</p>
                                        {apt.reason && <p className="text-sm text-gray-500 mt-1">Reason: {apt.reason}</p>}
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {apt.status || 'Pending'}
                                        </span>

                                        {apt.status === 'Pending' && (
                                            <div className="flex gap-2">
                                                <button onClick={() => handleStatusUpdate(apt._id, 'Confirmed')} className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-green-600">Approve</button>
                                                <button onClick={() => handleStatusUpdate(apt._id, 'Rejected')} className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-600">Reject</button>
                                            </div>
                                        )}

                                        {/* Action Buttons for Confirmed Appointments */}
                                        {apt.status === 'Confirmed' && (
                                            <div className="flex gap-2 mt-2 md:mt-0">
                                                <button 
                                                    onClick={() => {
                                                        setActivePrescriptionAppt(apt);
                                                        setActiveTreatmentAppt(null); 
                                                    }}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700 transition shadow-sm"
                                                >
                                                    Write Prescription
                                                </button>
                                                <button 
                                                    onClick={() => {
                                                        setActiveTreatmentAppt(apt);
                                                        setActivePrescriptionAppt(null); 
                                                    }}
                                                    className="bg-purple-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-purple-700 transition shadow-sm"
                                                >
                                                    Log Treatment
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Inline Prescription Form */}
                                {activePrescriptionAppt?._id === apt._id && (
                                    <div className="mt-6 p-4 border border-blue-200 bg-blue-50 rounded-md">
                                        <h3 className="font-bold text-blue-800 mb-3">Prescription for {apt.patient?.name}</h3>
                                        <form onSubmit={handlePrescriptionSubmit} className="space-y-3">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                <input type="text" placeholder="Medication Name (e.g., Panadol)" value={medName} onChange={(e) => setMedName(e.target.value)} className="p-2 border rounded w-full" required />
                                                <input type="text" placeholder="Dosage (e.g., 500mg)" value={dosage} onChange={(e) => setDosage(e.target.value)} className="p-2 border rounded w-full" required />
                                                <input type="text" placeholder="Frequency (e.g., Twice a day)" value={frequency} onChange={(e) => setFrequency(e.target.value)} className="p-2 border rounded w-full" required />
                                            </div>
                                            <textarea placeholder="Additional Notes or Instructions..." value={notes} onChange={(e) => setNotes(e.target.value)} className="p-2 border rounded w-full resize-none" rows="2"></textarea>
                                            <div className="flex gap-2">
                                                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700">Save Prescription</button>
                                                <button type="button" onClick={() => setActivePrescriptionAppt(null)} className="bg-gray-400 text-white px-4 py-2 rounded font-bold hover:bg-gray-500">Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {/* Inline Treatment Form */}
                                {activeTreatmentAppt?._id === apt._id && (
                                    <div className="mt-6 p-5 border border-purple-200 bg-purple-50 rounded-md shadow-inner">
                                        <h3 className="font-bold text-purple-800 mb-4 text-lg border-b border-purple-200 pb-2">
                                            Log Treatment & Vitals for {apt.patient?.name}
                                        </h3>
                                        <form onSubmit={handleTreatmentSubmit} className="space-y-5">
                                            
                                            {/* Vitals Section */}
                                            <div>
                                                <h4 className="text-sm font-bold text-purple-700 mb-2 uppercase tracking-wide">Patient Vitals</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                    <input type="text" placeholder="Blood Pressure (e.g., 120/80)" value={vitals.bp} onChange={(e) => setVitals({...vitals, bp: e.target.value})} className="p-2.5 border border-gray-300 rounded w-full focus:ring-2 focus:ring-purple-400 focus:outline-none" required />
                                                    <input type="text" placeholder="Weight (e.g., 70 kg)" value={vitals.weight} onChange={(e) => setVitals({...vitals, weight: e.target.value})} className="p-2.5 border border-gray-300 rounded w-full focus:ring-2 focus:ring-purple-400 focus:outline-none" required />
                                                    <input type="text" placeholder="Temperature (e.g., 98.6°F)" value={vitals.temp} onChange={(e) => setVitals({...vitals, temp: e.target.value})} className="p-2.5 border border-gray-300 rounded w-full focus:ring-2 focus:ring-purple-400 focus:outline-none" required />
                                                </div>
                                            </div>

                                            {/* Diagnosis & Plan Section */}
                                            <div>
                                                <h4 className="text-sm font-bold text-purple-700 mb-2 uppercase tracking-wide">Diagnosis & Treatment Plan</h4>
                                                <div className="space-y-3">
                                                    <input type="text" placeholder="Primary Diagnosis" value={plan.diagnosis} onChange={(e) => setPlan({...plan, diagnosis: e.target.value})} className="p-2.5 border border-gray-300 rounded w-full focus:ring-2 focus:ring-purple-400 focus:outline-none" required />
                                                    <textarea placeholder="Detailed Treatment Plan & Instructions..." value={plan.plan} onChange={(e) => setPlan({...plan, plan: e.target.value})} className="p-2.5 border border-gray-300 rounded w-full resize-none focus:ring-2 focus:ring-purple-400 focus:outline-none" rows="3" required></textarea>
                                                </div>
                                            </div>

                                            {/* Follow-up Section */}
                                            <div>
                                                <h4 className="text-sm font-bold text-purple-700 mb-2 uppercase tracking-wide">Schedule Follow-up</h4>
                                                <input type="date" value={plan.followUp} onChange={(e) => setPlan({...plan, followUp: e.target.value})} className="p-2.5 border border-gray-300 rounded w-full md:w-1/3 focus:ring-2 focus:ring-purple-400 focus:outline-none" required />
                                            </div>

                                            {/* Submit & Cancel */}
                                            <div className="flex gap-3 pt-2">
                                                <button type="submit" className="bg-purple-600 text-white px-5 py-2.5 rounded font-bold shadow hover:bg-purple-700 transition-transform transform hover:-translate-y-0.5">
                                                    Save Treatment Record
                                                </button>
                                                <button type="button" onClick={() => setActiveTreatmentAppt(null)} className="bg-gray-400 text-white px-5 py-2.5 rounded font-bold shadow hover:bg-gray-500 transition-colors">
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}