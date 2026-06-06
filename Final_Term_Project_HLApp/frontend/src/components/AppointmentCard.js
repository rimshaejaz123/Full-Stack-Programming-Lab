export default function AppointmentCard({ appointment, role, onAction }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg text-gray-800">
          {role === "patient" ? `Dr. ${appointment.doctor?.name}` : `Patient: ${appointment.patient?.name}`}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          appointment.status === "Confirmed" ? "bg-green-100 text-green-700" :
          appointment.status === "Pending" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
        }`}>
          {appointment.status}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-1"><strong>Date:</strong> {appointment.date.split("T")[0]} at {appointment.time}</p>
      <p className="text-gray-600 text-sm mb-4"><strong>Reason:</strong> {appointment.reasonForVisit}</p>
      
      {/* Conditional buttons for Doctors/Admins */}
      {role !== "patient" && appointment.status === "Pending" && (
        <div className="flex space-x-2 mt-4 pt-4 border-t">
          <button onClick={() => onAction(appointment._id, "Confirmed")} className="w-full bg-green-500 text-white py-1 rounded hover:bg-green-600 text-sm">Accept</button>
          <button onClick={() => onAction(appointment._id, "Rejected")} className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 text-sm">Reject</button>
        </div>
      )}
    </div>
  );
}