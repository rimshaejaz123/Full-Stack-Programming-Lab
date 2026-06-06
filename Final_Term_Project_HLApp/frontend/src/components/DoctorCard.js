export default function DoctorCard({ doctor, onBook }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow border flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
        {doctor.user.name.charAt(0)}
      </div>
      <h3 className="text-xl font-bold text-gray-800">{doctor.user.name}</h3>
      <p className="text-blue-600 font-medium mb-2">{doctor.specialization}</p>
      <p className="text-sm text-gray-500 mb-4">{doctor.experienceYears} Years Experience</p>
      <button 
        onClick={() => onBook(doctor._id)}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Book Appointment
      </button>
    </div>
  );
}