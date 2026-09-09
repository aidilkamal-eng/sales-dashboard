"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [isLoading, user, router]);

  if (isLoading || user) {
    return <p>Loading...</p>
  }

  return (
    <main className="min-h-dvh flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xs sm:max-w-sm bg-white p-6 sm:p-8 rounded-lg shadow">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
          Sales Dashboard Login
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}