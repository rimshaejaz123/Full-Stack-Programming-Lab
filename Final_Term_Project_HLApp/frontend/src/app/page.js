import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-6">
          Healthcare Appointment System
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A centralized platform for patients, doctors, and administrators to manage medical appointments, treatments, and prescriptions efficiently.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            href="/login" 
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Login to Dashboard
          </Link>
          <Link 
            href="/register" 
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md border border-blue-200 hover:bg-gray-50 transition"
          >
            Register New Account
          </Link>
        </div>
      </div>
    </div>
  );
}