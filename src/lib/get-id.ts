import { cookies } from "next/headers";
import { api } from "@/api";

export async function getUserId() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("better-auth.session_token"); // ou o nome correto do seu cookie

    if (!sessionCookie) {
      return null;
    }

    const id = await api.get("/api/auth/get-id", {
      url: process.env.INTERNAL_API_URL,
      withCredentials: true,
      headers: {
        Cookie: `better-auth.session_token=${sessionCookie.value}`,
      },
    });

    return id.data.id;
  } catch (_error) {
    return null;
  }
}
