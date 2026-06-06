"use client";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-hot-toast";

export default function TreatmentsPage() {
  const [treatments, setTreatments] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    try {
      const res = await api.get("/treatments");
      setTreatments(res.data);
    } catch (error) {
      toast.error("Failed to load treatment records");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Treatment Tracker</h1>
      </div>

      <div className="space-y-6">
        {treatments.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow border text-center text-gray-500">
            No active or past treatments found.
          </div>
        ) : (
          treatments.map((treatment) => (
            <div key={treatment._id} className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition">
              <div className="flex justify-between items-start border-b pb-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {role === "patient" ? `Treated by: ${treatment.doctor?.name}` : `Patient: ${treatment.patient?.name}`}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Record Date: {treatment.createdAt.split("T")[0]}</p>
                </div>
                <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                  treatment.status === "Ongoing" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                }`}>
                  {treatment.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded border">
                  <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Physical Checkup Notes
                  </h3>
                  <p className="text-gray-600">{treatment.physicalCheckupNotes}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded border">
                  <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    Treatment Progress
                  </h3>
                  <p className="text-gray-600">{treatment.treatmentProgress}</p>
                </div>
              </div>

              {treatment.followUpDate && (
                <div className="mt-4 pt-4 border-t flex items-center text-blue-700 bg-blue-50 p-3 rounded">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span className="font-semibold mr-2">Scheduled Follow-up:</span> 
                  {treatment.followUpDate.split("T")[0]}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}