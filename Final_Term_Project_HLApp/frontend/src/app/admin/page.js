"use client";
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (!token) return window.location.href = '/login';

        try {
            const docRes = await fetch('http://localhost:5000/api/admin/doctors', { headers: { 'Authorization': `Bearer ${token}` } });
            const patRes = await fetch('http://localhost:5000/api/admin/patients', { headers: { 'Authorization': `Bearer ${token}` } });
            
            if (docRes.ok) setDoctors((await docRes.json()).doctors);
            if (patRes.ok) setPatients((await patRes.json()).patients);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (id, type) => {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:5000/api/admin/${type}s/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                alert(`${type} deleted successfully!`);
                fetchData();
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-blue-600">Admin Control Panel</h1>
                <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }} className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600">Logout</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded shadow border">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Manage Doctors ({doctors.length})</h2>
                    <div className="space-y-3">
                        {doctors.map(d => (
                            <div key={d._id} className="flex justify-between items-center p-3 bg-blue-50 border rounded">
                                <div><p className="font-semibold">{d.name}</p><p className="text-sm text-gray-600">{d.email}</p></div>
                                <button onClick={() => handleDelete(d._id, 'doctor')} className="text-red-500 font-bold hover:text-red-700">Delete</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded shadow border">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Manage Patients ({patients.length})</h2>
                    <div className="space-y-3">
                        {patients.map(p => (
                            <div key={p._id} className="flex justify-between items-center p-3 bg-green-50 border rounded">
                                <div><p className="font-semibold">{p.name}</p><p className="text-sm text-gray-600">{p.email}</p></div>
                                <button onClick={() => handleDelete(p._id, 'patient')} className="text-red-500 font-bold hover:text-red-700">Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}