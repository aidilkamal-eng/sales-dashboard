import { SalesData } from "@/types";

export function getTotalKunjungan(data: SalesData[]): number {
  return data.reduce((acc, curr) => acc + curr.kunjungan_realisasi, 0);
}

export function getRataRataEfektivitas(data: SalesData[]): number {
  const totalEfektivitas = data.reduce((acc, curr) => acc + curr.efektivitas_visit_persen, 0);
  return Math.round(totalEfektivitas / data.length);
}

export function getTotalOrder(data: SalesData[]): number {
  return data.reduce((acc, curr) => acc + curr.total_order_rp, 0);
}

export function formatRupiah(value: number): string {
    return Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0}).format(value);
}

export function filterSalesData(
  data: SalesData[],
  searchTerm: string,
  selectedArea: string
): SalesData[] {
  return data.filter((item) => {
    const matchesSearch = item.nama_sales.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === "" || selectedArea === "Semua" || item.area === selectedArea;
    return matchesSearch && matchesArea;
  });
}