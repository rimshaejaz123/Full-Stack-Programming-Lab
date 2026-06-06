"use client";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-hot-toast";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch (error) {
      toast.error("Failed to load appointments");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Appointment Directory</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md border">
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No appointments found in the system.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border-b p-4">Date & Time</th>
                  <th className="border-b p-4">{role === "patient" ? "Doctor" : "Patient"}</th>
                  <th className="border-b p-4">Reason</th>
                  <th className="border-b p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt._id} className="hover:bg-gray-50 transition">
                    <td className="border-b p-4 font-medium">
                      {appt.date.split("T")[0]} at {appt.time}
                    </td>
                    <td className="border-b p-4">
                      {role === "patient" ? appt.doctor?.name : appt.patient?.name || "Unknown"}
                    </td>
                    <td className="border-b p-4 text-gray-600">{appt.reasonForVisit}</td>
                    <td className="border-b p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        appt.status === "Confirmed" ? "bg-green-100 text-green-700" :
                        appt.status === "Pending" ? "bg-orange-100 text-orange-700" :
                        appt.status === "Completed" ? "bg-blue-100 text-blue-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}