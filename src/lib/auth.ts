import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
  baseURL: "http://localhost:3333/api/auth", // The base URL of your auth server
  fetchOptions: {
    credentials: "include",  // Include cookies for session management
  },
})  