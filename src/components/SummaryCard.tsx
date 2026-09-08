interface SummaryCardProps {
  label: string;
  value: string;
}

export default function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}