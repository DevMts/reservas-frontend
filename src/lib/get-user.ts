import { api } from "@/api";
import { getUserId } from "./get-id";

export async function getUser() {
  try {
    console.log(process.env.INTERNAL_API_URL);
    const id = await getUserId();
    const user = await api.get(`/user/${id}`, {
      url: process.env.INTERNAL_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return user.data.user;
  } catch (error) {
    return null;
  }
}
