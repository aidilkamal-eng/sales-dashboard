"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-4">
      <div>
        <h1 className="text-xl font-bold">Sales Dashboard</h1>
        <h2>Halo, {user?.firstName} {user?.lastName}</h2>
      </div>
      <button
        className="bg-red-600 text-white rounded px-4 py-2"
        onClick={handleLogout}
        >
        Logout
      </button>
    </header>
  );
}