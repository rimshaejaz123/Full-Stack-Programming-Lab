"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-wider">
          HealthCare App
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link href={`/${user.role}`} className="hover:text-blue-200 capitalize">
                {user.role} Dashboard
              </Link>
              <button onClick={logout} className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-200">Login</Link>
              <Link href="/register" className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}