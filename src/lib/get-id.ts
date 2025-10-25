import { api } from "@/api";



export async function getUserId() {
  const id = await api
    .get("/api/auth/get-id", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
  return id.data.id;
}
