"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { SalesData } from "@/types";
import { formatRupiah } from "@/lib/salesUtils";

interface OrderDistributionChartProps {
  data: SalesData[];
}

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed"];

export default function OrderDistributionChart({ data }: OrderDistributionChartProps) {
  const chartData = data.map((item, index) => ({
    name: item.nama_sales,
    value: item.total_order_rp,
    fill: COLORS[index % COLORS.length]
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-4">Kontribusi Total Order per Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={(entry) => entry.name}
          />
          <Tooltip formatter={(value) => formatRupiah(Number(value))} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}