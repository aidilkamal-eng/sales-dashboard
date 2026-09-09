"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import Header from "@/components/Header";
import SummaryCard from "@/components/SummaryCard";
import salesData from "@/data/sales.json"
import { SalesData } from "@/types";
import { getTotalKunjungan, getRataRataEfektivitas, getTotalOrder, formatRupiah, filterSalesData } from "@/lib/salesUtils";
import SalesTable from "@/components/SalesTable";
import EffectivenessChart from "@/components/EffectivenessChart";
import OrderDistributionChart from "@/components/OrderDistributionChart";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
        router.push("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return <p>Loading...</p>;
  }

  const data = salesData as SalesData[];
  const filteredData = filterSalesData(data, searchTerm, selectedArea);
  const chartData = filterSalesData(data, "", selectedArea);

  const areas = data.map((item) => item.area);
  const uniqueAreas = Array.from(new Set(areas));

  return (
    <main>
      <Header />

      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="lg:w-1/2">
          <EffectivenessChart data={chartData}/>
        </div>
        <div className="lg:w-1/2">
          <OrderDistributionChart data={chartData}/>
        </div>
      </div>

      <div className="flex sm:flex-row flex-col gap-4">
          <SummaryCard label="Total kunjungan" value={`${getTotalKunjungan(data)}`} className="flex-1" />
          <SummaryCard label="Rata-rata efektivitas" value={`${getRataRataEfektivitas(data)}%`} className="flex-1" />
          <SummaryCard label="Total order" value={formatRupiah(getTotalOrder(data))} className="flex-1" />
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Cari nama sales..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
          />
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Semua Area</option>
            {uniqueAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <SalesTable data={filteredData} />
      </div>
    </main>
  );
}