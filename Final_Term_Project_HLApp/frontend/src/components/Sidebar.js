"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ role }) {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", path: `/${role}` },
    { name: "Appointments", path: "/appointments" },
    { name: "Prescriptions", path: "/prescriptions" },
    { name: "Treatments", path: "/treatments" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-center text-blue-400 capitalize">{role} Panel</h2>
      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <Link 
            key={link.name} 
            href={link.path}
            className={`p-3 rounded transition ${
              pathname === link.path ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}