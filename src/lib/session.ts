import { cookies } from "next/headers";

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("better-auth.session_token"); // ou o nome correto do seu cookie

    if (!sessionCookie) {
      return null;
    }

    // Faz a requisição para a API com o cookie
    const response = await fetch(
      `${process.env.INTERNAL_API_URL}/api/auth/get-session`,
      {
        headers: {
          Cookie: `better-auth.session_token=${sessionCookie.value}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar sessão:", error);
    return null;
  }
}
