"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import Header from "@/components/Header";
import SummaryCard from "@/components/SummaryCard";
import salesData from "@/data/sales.json"
import { SalesData } from "@/types";
import { getTotalKunjungan, getRataRataEfektivitas, getTotalOrder, formatRupiah } from "@/lib/salesUtils";

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

  const data = salesData as SalesData[];

  return (
    <main>
      <Header />
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <SummaryCard label="Total kunjungan" value={`${getTotalKunjungan(data)}`}/>
          <SummaryCard label="Rata-rata efektivitas" value={`${getRataRataEfektivitas(data)}%`}/>
          <SummaryCard label="Total order" value={formatRupiah(getTotalOrder(data))}/>
        </div>
      </div>
    </main>
  );
}