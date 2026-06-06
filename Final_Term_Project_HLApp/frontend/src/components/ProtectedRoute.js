"use client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Kick them back to their own dashboard if they try to access the wrong role's page
        router.push(`/${user.role}`);
      }
    }
  }, [user, loading, router, allowedRoles]);

  if (loading || !user) return <div className="p-8 text-center">Loading secure environment...</div>;

  return <>{children}</>;
}