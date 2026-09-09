import { useState } from "react";
import { SalesData } from "@/types";
import { formatRupiah } from "@/lib/salesUtils";

interface SalesTableProps {
  data: SalesData[];
}

type SortKey = keyof SalesData;
type SortDirection = "asc" | "desc";

export default function SalesTable({ data }: SalesTableProps) {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortDirection("asc");
        setSortKey(null);
      }
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0; // belum ada sorting, urutan asli

    const valA = a[sortKey];
    const valB = b[sortKey];

    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th
              className="px-4 py-3 cursor-pointer select-none" 
              scope="col"
              onClick={() => handleSort("nama_sales")}
            >
              Nama Sales {sortKey === "nama_sales" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-3 cursor-pointer select-none" 
              scope="col"
              onClick={() => handleSort("area")}
            >
              Area {sortKey === "area" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-3 cursor-pointer select-none" 
              scope="col"
              onClick={() => handleSort("kunjungan_planned")}
            >
              Planned {sortKey === "kunjungan_planned" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-3 cursor-pointer select-none" 
              scope="col"
              onClick={() => handleSort("kunjungan_realisasi")}
            >
              Realisasi {sortKey === "kunjungan_realisasi" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-3 cursor-pointer select-none" 
              scope="col"
              onClick={() => handleSort("efektivitas_visit_persen")}
            >
              Efektivitas {sortKey === "efektivitas_visit_persen" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-3 cursor-pointer select-none" 
              scope="col"
              onClick={() => handleSort("total_order_rp")}
            >
              Total Order {sortKey === "total_order_rp" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-3 cursor-pointer select-none" 
              scope="col"
              onClick={() => handleSort("jumlah_order_oos")}
            >
              OOS {sortKey === "jumlah_order_oos" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-5">
                Tidak ada data yang cocok dengan pencarian
              </td>
            </tr>
          ) : (
            sortedData.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-3">{item.nama_sales}</td>
                <td className="px-4 py-3">{item.area}</td>
                <td className="px-4 py-3">{item.kunjungan_planned}</td>
                <td className="px-4 py-3">{item.kunjungan_realisasi}</td>
                <td className="px-4 py-3">{item.efektivitas_visit_persen}%</td>
                <td className="px-4 py-3">{formatRupiah(item.total_order_rp)}</td>
                <td className="px-4 py-3">{item.jumlah_order_oos}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}