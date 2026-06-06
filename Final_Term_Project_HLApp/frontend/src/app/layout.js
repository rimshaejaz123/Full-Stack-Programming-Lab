import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Healthcare Appointment System",
  description: "Secure medical appointment booking and tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        {/* AuthProvider wraps the app so every page knows if you are logged in */}
        <AuthProvider>
          {/* Navbar sits at the top of every single page */}
          <Navbar />
          
          {/* Toaster allows error/success popups to work globally */}
          <Toaster position="top-right" />
          
          {/* This is where your individual pages (dashboards, etc.) will render */}
          <main className="flex-grow">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}