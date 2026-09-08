"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SalesData } from "@/types";

interface EffectivenessChartProps {
  data: SalesData[];
}

export default function EffectivenessChart({ data }: EffectivenessChartProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-4">Efektivitas Kunjungan per Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nama_sales"/>
          <YAxis/>
          <Tooltip />
          <Bar dataKey="efektivitas_visit_persen" fill="#2563eb"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}