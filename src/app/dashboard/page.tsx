"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
        router.push("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <Header />
      {/* nanti SummaryCard, SalesTable, EffectivenessChart di sini */}
    </main>
  );
}