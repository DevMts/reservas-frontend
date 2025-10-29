import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/auth`, // The base URL of your auth server
  fetchOptions: {
    credentials: "include",  // Include cookies for session management
  },
})  