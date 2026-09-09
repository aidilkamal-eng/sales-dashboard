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
    throw new Error("Gagal terhubung ke server. Silakan tunggu sebentar lalu coba lagi.");
  }

  if (response.status === 429) {
    throw new Error("Terlalu banyak percobaan login. Silakan coba lagi dalam beberapa saat.");
  }

  const data = await response.json();

  const ERROR_MESSAGES: Record<string, string> = {
    "Invalid credentials": "Username atau password salah",
    "Username and password required": "Username dan password tidak boleh kosong"
  };

  if (!response.ok) {
    if (!data.message) {
      throw new Error("Login gagal");
    } else {
      const translatedMessage = ERROR_MESSAGES[data.message] ?? data.message;
      throw new Error(`Ada masalah pada proses login: ${translatedMessage}`);
    }
  }


  return data;
}