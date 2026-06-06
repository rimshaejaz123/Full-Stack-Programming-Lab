"use client";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-hot-toast";

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const res = await api.get("/prescriptions");
      setPrescriptions(res.data);
    } catch (error) {
      toast.error("Failed to load prescriptions");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Prescription Records</h1>
      
      {prescriptions.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow border text-center text-gray-500">
          No prescriptions have been issued yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prescriptions.map((rx) => (
            <div key={rx._id} className="bg-white p-6 rounded-lg shadow-md border border-blue-100 relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-bold">
                Rx
              </div>
              <p className="text-sm text-gray-500 mb-2">Issued: {rx.createdAt.split("T")[0]}</p>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Prescribing Doctor: {rx.doctor?.name}</h3>
              
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 border-b pb-2 mb-2">Medications</h4>
                <ul className="space-y-3">
                  {rx.medications.map((med, index) => (
                    <li key={index} className="bg-gray-50 p-3 rounded border">
                      <p className="font-bold text-blue-700">{med.name} <span className="text-gray-600 font-normal">({med.dosage})</span></p>
                      <p className="text-sm text-gray-600">Schedule: {med.schedule}</p>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold text-gray-700">Doctor's Instructions:</h4>
                <p className="text-gray-600 italic mt-1">"{rx.instructions}"</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}