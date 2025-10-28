import { api } from "@/api";
import { getUserId } from "./get-id";



export async function getUser() {
  try {
    const id = await getUserId();
    const user = await api.get(`/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    return user.data.user;
  } catch (error) {
    console.error("Erro ao obter o usuário:", error);
    return null;
  }
}
