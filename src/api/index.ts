import axios from "axios";

const baseURL =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL // dentro do container (SSR, server components)
    : process.env.NEXT_PUBLIC_API_URL; // navegador local

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
