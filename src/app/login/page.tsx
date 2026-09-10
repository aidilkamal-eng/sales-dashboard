"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";
import LoadingScreen from "@/components/LoadingScreen";

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [isLoading, user, router]);

  if (isLoading || user) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center bg-blue-600 px-4 gap-6">
      <h1 className="text-3xl font-bold text-white absolute top-10 left-0 w-full text-center">
        Sales Dashboard
      </h1>
      <div className="w-full max-w-xs sm:max-w-sm bg-white p-6 sm:p-8 rounded-lg shadow">
        <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
          Login
        </h2>
        <LoginForm />
      </div>
    </main>
  );
}