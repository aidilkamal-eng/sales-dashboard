import { User } from "@/types";

export async function loginUser(username: string, password: string): Promise<User> {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  })


  if (!response.ok) {
    throw new Error("Ada masalah pada proses login");
  }


  const data = await response.json();
  return data;
}