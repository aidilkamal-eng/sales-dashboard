"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/lib/auth";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (username.trim() === "" && password.trim() === "") {
        setError("Username dan password harus terisi");
        return;
      } else if (username.trim() === "") {
        setError("Username harus terisi");
        return;
      } else if (password.trim() === "") {
        setError("Password harus terisi");
        return;
      } else {
        const user = await loginUser(username, password);
        login(user);
        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium">
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                />
            </div>

            {error != null && <p className="text-red-600 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 active:bg-blue-700 text-white rounded px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                {loading ? "Loading...": "Masuk"}
            </button>
        </form>
    );
}