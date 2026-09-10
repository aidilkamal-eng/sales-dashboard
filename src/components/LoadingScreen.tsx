export default function LoadingScreen() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-white gap-7">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin">
        <span className="sr-only">Memuat halaman...</span>
      </div>
      
      <p className="text-sm text-black">Memuat halaman...</p>
    </div>
  );
}