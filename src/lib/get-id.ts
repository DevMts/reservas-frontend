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
      withCredentials: true,
      headers: {
        Cookie: `better-auth.session_token=${sessionCookie.value}`,
      },
    });
    console.log("getUserId id:", id);

    return id.data.id;
  } catch (_error) {
    return null;
  }
}
