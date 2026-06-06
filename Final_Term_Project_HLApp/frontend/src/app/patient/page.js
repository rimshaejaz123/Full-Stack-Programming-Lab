"use client";

import { useState, useEffect } from 'react';

export default function PatientDashboard() {
    // 1. Form state variables
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [enteredReason, setEnteredReason] = useState('');
    
    // 2. Data state variables
    const [appointments, setAppointments] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [treatments, setTreatments] = useState([]);

    // 3. Fetch Data Functions
    const fetchAppointments = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const response = await fetch('http://localhost:5000/api/appointments/my-appointments', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) setAppointments(data.appointments || []);
        } catch (error) { console.error("Error loading appointments:", error); }
    };

    const fetchNotifications = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const res = await fetch('http://localhost:5000/api/notifications', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setNotifications((await res.json()).notifications);
        } catch (error) { console.error("Error loading notifications:", error); }
    };

    const fetchMedicalRecords = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const rxRes = await fetch('http://localhost:5000/api/prescriptions/my-prescriptions', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (rxRes.ok) setPrescriptions((await rxRes.json()).prescriptions);

            const txRes = await fetch('http://localhost:5000/api/treatments/my-history', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (txRes.ok) setTreatments((await txRes.json()).treatments);
        } catch (error) { console.error("Error loading medical records:", error); }
    };

    // Load everything when the page mounts
    useEffect(() => {
        fetchAppointments();
        fetchNotifications();
        fetchMedicalRecords();
    }, []);

    // 4. Action Handlers
    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); 
        
        if (!token) return alert("Authentication error: Please log in again.");

        const payload = { doctorId: selectedDoctorId, date: selectedDate, time: selectedTime, reason: enteredReason };

        try {
            const response = await fetch('http://localhost:5000/api/appointments/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Success: Appointment booked successfully!'); 
                setSelectedDoctorId(''); setSelectedDate(''); setSelectedTime(''); setEnteredReason('');
                fetchAppointments(); // Refresh list immediately
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("A network error occurred while booking the appointment.");
        }
    };

    const markAlertRead = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
                method: 'PUT', headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchNotifications();
        } catch (error) { console.error("Error marking alert as read:", error); }
    };

    // 5. The UI
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-3xl font-extrabold text-blue-700">Patient Dashboard</h1>
                <button 
                    onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }} 
                    className="bg-red-500 text-white px-5 py-2 rounded-md font-bold shadow hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </div>
            
            {/* Top Section: Booking & Appointments/Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* LEFT COLUMN: Book an Appointment */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-fit">
                    <h2 className="text-xl font-bold mb-5 text-gray-800 flex items-center gap-2">
                        <span>📅</span> Book an Appointment
                    </h2>
                    <form onSubmit={handleBookingSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="doctor">Select Physician</label>
                            <div className="relative">
                                <select 
                                    id="doctor" value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)}
                                    className="block appearance-none w-full bg-gray-50 border border-gray-300 hover:border-blue-400 px-4 py-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" required
                                >
                                    <option value="" disabled>Choose a specialist...</option>
                                    <option value="65f1a2b3c4d5e6f7a8b9c001">Dr. Tariq Mahmood — Cardiologist</option>
                                    <option value="65f1a2b3c4d5e6f7a8b9c002">Dr. Aisha Khan — Dermatologist</option>
                                    <option value="65f1a2b3c4d5e6f7a8b9c003">Dr. Bilal Ahmed — Pediatrician</option>
                                    <option value="65f1a2b3c4d5e6f7a8b9c004">Dr. Sana Sheikh — Neurologist</option>
                                    <option value="65f1a2b3c4d5e6f7a8b9c005">Dr. Usman Ali — Orthopedic Surgeon</option>
                                    <option value="65f1a2b3c4d5e6f7a8b9c006">Dr. Fatima Raza — Gynecologist</option>
                                    <option value="65f1a2b3c4d5e6f7a8b9c007">Dr. Imran Qureshi — Psychiatrist</option>
                                    <option value="65f1a2b3c4d5e6f7a8b9c008">Dr. Nida Shah — Ophthalmologist</option>
                                    <option value="65f1a2b3c4d5e6f7a8b9c009">Dr. Zainab Malik — ENT Specialist</option>
                                    <option value="65f1a2b3c4d5e6f7a8b9c010">Dr. Fahad Mustafa — Gastroenterologist</option>
                                    <option value="65f1a2b3c4d5e6f7a8b9c011">Dr. Hira Tareen — Endocrinologist</option>
                                    <option value="65f1a2b3c4d5e6f7a8b9c012">Dr. Kamran Akmal — Urologist</option>
                                    <option value="65f1a2b3c4d5e6f7a8b9c013">Dr. Sadia Imam — Oncologist</option>
                                    <option value="65f1a2b3c4d5e6f7a8b9c014">Dr. Asad Umar — Pulmonologist</option>
                                    <option value="65f1a2b3c4d5e6f7a8b9c015">Dr. Maryam Tariq — General Physician</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="date">Appointment Date</label>
                                <input id="date" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="time">Preferred Time</label>
                                <input id="time" type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="reason">Reason for Visit</label>
                            <textarea id="reason" rows="3" placeholder="Briefly describe your symptoms..." value={enteredReason} onChange={(e) => setEnteredReason(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 font-bold shadow-md transition-transform transform hover:-translate-y-0.5">
                            Confirm Appointment
                        </button>
                    </form>
                </div>

                {/* RIGHT COLUMN: Alerts & Appointments */}
                <div className="space-y-8">
                    
                    {/* Mobile Alerts */}
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                        <div className="flex items-center gap-2 mb-4 border-b pb-2">
                            <span className="text-xl">🔔</span>
                            <h2 className="text-xl font-bold text-gray-800">Mobile Alerts</h2>
                            {notifications.filter(n => !n.isRead).length > 0 && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-auto">
                                    {notifications.filter(n => !n.isRead).length} New
                                </span>
                            )}
                        </div>
                        {notifications.length === 0 ? (
                            <p className="text-gray-500 italic">No new alerts.</p>
                        ) : (
                            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                {notifications.map((notif) => (
                                    <div key={notif._id} className={`p-4 rounded-md border-l-4 shadow-sm flex justify-between items-start ${notif.isRead ? 'bg-gray-50 border-gray-300' : 'bg-blue-50 border-blue-500'}`}>
                                        <div>
                                            <p className={`text-sm ${notif.isRead ? 'text-gray-600' : 'text-gray-900 font-bold'}`}>{notif.message}</p>
                                            <p className="text-xs text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</p>
                                        </div>
                                        {!notif.isRead && (
                                            <button onClick={() => markAlertRead(notif._id)} className="text-blue-600 hover:text-blue-800 text-xs font-bold whitespace-nowrap ml-3 bg-blue-100 px-2 py-1 rounded">Mark Read</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* My Appointments */}
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                        <div className="flex items-center gap-2 mb-4 border-b pb-2">
                            <span className="text-xl">📋</span>
                            <h2 className="text-xl font-bold text-gray-800">My Appointments</h2>
                        </div>
                        {appointments.length === 0 ? (
                            <p className="text-gray-500 italic">No appointments found.</p>
                        ) : (
                            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                                {appointments.map((apt) => (
                                    <div key={apt._id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex justify-between items-center shadow-sm hover:shadow transition-shadow">
                                        <div>
                                            <p className="font-bold text-gray-900 text-lg">{apt.doctor?.name || "Unknown Doctor"}</p>
                                            <p className="text-sm text-gray-600 font-medium">{apt.date} at {apt.time}</p>
{apt.reason && <p className="text-sm text-gray-500 bg-white inline-block px-2 py-1 border rounded mt-2">"{apt.reason}"</p>}                                        </div>
                                        <div>
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                                                apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                                                apt.status === 'Confirmed' ? 'bg-green-100 text-green-800 border border-green-200' :
                                                'bg-red-100 text-red-800 border border-red-200'
                                            }`}>
                                                {apt.status || 'Pending'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- BOTTOM SECTION: MEDICAL HISTORY --- */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Prescriptions Panel */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-blue-200">
                    <div className="flex items-center gap-2 mb-4 border-b pb-2">
                        <span className="text-xl">💊</span>
                        <h2 className="text-xl font-bold text-blue-800">My Prescriptions</h2>
                    </div>
                    {prescriptions.length === 0 ? (
                        <p className="text-gray-500 italic">No prescriptions on file.</p>
                    ) : (
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                            {prescriptions.map(rx => (
                                <div key={rx._id} className="p-5 bg-blue-50 border border-blue-100 rounded-lg shadow-sm">
                                    <p className="text-sm text-gray-600 mb-3 font-semibold">Prescribed by {rx.doctor?.name} on {new Date(rx.createdAt).toLocaleDateString()}</p>
                                    {rx.medications.map((med, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-md border border-blue-100 mb-2 shadow-sm">
                                            <p className="font-extrabold text-blue-900 text-lg">{med.name}</p>
                                            <div className="flex gap-4 mt-1 text-sm text-gray-700">
                                                <p><span className="font-bold text-gray-900">Dosage:</span> {med.dosage}</p>
                                                <p><span className="font-bold text-gray-900">Frequency:</span> {med.frequency}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {rx.notes && <p className="text-sm text-blue-800 mt-3 bg-blue-100/50 p-3 rounded-md italic">Notes: {rx.notes}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Treatment History Panel */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-purple-200">
                    <div className="flex items-center gap-2 mb-4 border-b pb-2">
                        <span className="text-xl">🩺</span>
                        <h2 className="text-xl font-bold text-purple-800">Treatment History</h2>
                    </div>
                    {treatments.length === 0 ? (
                        <p className="text-gray-500 italic">No treatment records found.</p>
                    ) : (
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                            {treatments.map(tx => (
                                <div key={tx._id} className="p-5 bg-purple-50 border border-purple-100 rounded-lg shadow-sm">
                                    <div className="flex justify-between items-start mb-3">
                                        <p className="font-extrabold text-purple-900 text-lg">Diagnosis: {tx.diagnosis}</p>
                                        <span className="text-xs bg-purple-200 text-purple-900 px-3 py-1 rounded-full font-bold shadow-sm">
                                            {new Date(tx.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="mb-4 bg-white p-3 border border-purple-100 rounded-md shadow-sm text-sm text-gray-700">
                                        <strong className="text-purple-800">Treatment Plan:</strong><br/>
                                        {tx.treatmentPlan}
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-3 text-xs bg-white p-3 rounded-md border border-purple-100 text-center font-bold text-gray-500 shadow-sm">
                                        <div className="flex flex-col gap-1"><span>Blood Pressure</span><span className="text-gray-900 text-sm">{tx.bloodPressure || 'N/A'}</span></div>
                                        <div className="flex flex-col gap-1 border-x border-gray-200"><span>Weight</span><span className="text-gray-900 text-sm">{tx.weight || 'N/A'}</span></div>
                                        <div className="flex flex-col gap-1"><span>Temperature</span><span className="text-gray-900 text-sm">{tx.temperature || 'N/A'}</span></div>
                                    </div>

                                    {tx.followUpDate && (
                                        <div className="mt-4 flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 p-2 rounded border border-red-100">
                                            <span>📅</span> Next Follow-up: {tx.followUpDate}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}