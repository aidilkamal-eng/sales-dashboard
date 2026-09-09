import { SalesData } from "@/types";
import { formatRupiah } from "@/lib/salesUtils";

interface SalesTableProps {
  data: SalesData[];
}

export default function SalesTable({ data }: SalesTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Nama Sales</th>
            <th className="px-4 py-3">Area</th>
            <th className="px-4 py-3">Planned</th>
            <th className="px-4 py-3">Realisasi</th>
            <th className="px-4 py-3">Efektivitas</th>
            <th className="px-4 py-3">Total Order</th>
            <th className="px-4 py-3">OOS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
                <td className="px-4 py-3">{item.nama_sales}</td>
                <td className="px-4 py-3">{item.area}</td>
                <td className="px-4 py-3">{item.kunjungan_planned}</td>
                <td className="px-4 py-3">{item.kunjungan_realisasi}</td>
                <td className="px-4 py-3">{item.efektivitas_visit_persen}%</td>
                <td className="px-4 py-3">{formatRupiah(item.total_order_rp)}</td>
                <td className="px-4 py-3">{item.jumlah_order_oos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}