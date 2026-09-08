import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {/* TODO: judul halaman, bebas — misal "Sales Dashboard Login" */}
          Sales Dashboard Login
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}