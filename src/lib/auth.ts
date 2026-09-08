import { User } from "@/types";

export async function loginUser(username: string, password: string): Promise<User> {
  const url = "https://dummyjson.com/auth/login";
  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  };

  let response: Response;
  try {
    response = await fetch(url, options);
  } catch {
    // Fetch gagal total — kemungkinan CORS/network issue, sering terjadi
    // saat API publik DummyJSON sedang rate-limited. Retry otomatis
    // sengaja TIDAK dilakukan di sini karena akan memperparah rate limit.
    throw new Error("Gagal terhubung ke server. Silakan tunggu sebentar lalu coba lagi.");
  }

  if (response.status === 429) {
    throw new Error("Terlalu banyak percobaan login. Silakan coba lagi dalam beberapa saat.");
  }

  if (!response.ok) {
    throw new Error("Ada masalah pada proses login");
  }


  const data = await response.json();
  return data;
}