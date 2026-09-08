"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // masih proses cek localStorage, tunggu dulu

    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  return <p>Loading...</p>;
}