import { authClient } from "./auth"

export async function getSession() {
  try {
    const response = await authClient.getSession();
    console.log(response)
    if (response.data != null) {
      return true
    } else {
      return false
    }
  } catch (_) {
    return false
  }


}