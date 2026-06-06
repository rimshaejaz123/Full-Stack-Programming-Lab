export default function PatientCard({ patient }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow border">
      <h3 className="font-bold text-lg text-gray-800 border-b pb-2 mb-3">
        {patient.user?.name}
      </h3>
      <div className="space-y-2 text-sm text-gray-600">
        <p><strong>Email:</strong> {patient.user?.email}</p>
        <p><strong>Age:</strong> {patient.age || "N/A"} | <strong>Gender:</strong> {patient.gender || "N/A"}</p>
        <p><strong>Contact:</strong> {patient.contactNumber || "N/A"}</p>
        <p><strong>Address:</strong> {patient.address || "N/A"}</p>
      </div>
      {patient.medicalHistory && patient.medicalHistory.length > 0 && (
        <div className="mt-4 pt-3 border-t">
          <p className="font-semibold text-gray-700 mb-1">Medical History:</p>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {patient.medicalHistory.map((history, idx) => (
              <li key={idx}>{history}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}