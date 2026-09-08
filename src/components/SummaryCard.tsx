interface SummaryCardProps {
  label: string;
  value: string;
  className?: string;
}

export default function SummaryCard({ label, value, className = "" }: SummaryCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 flex flex-col justify-center ${className}`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}