import { authClient } from "../auth";

export enum SocialProvider {
  GITHUB = "github",
  GOOGLE = "google",
}

export async function handleSignInSocial(provider: SocialProvider) {
  try {
    const response = await authClient.signIn.social({
      provider: provider,
      callbackURL: "http://localhost:3000",
    });
    console.log(response);
    if (response.data?.url) {
      window.location.href = response.data.url;
    }
  } catch (error) {
    console.error(`Erro ao iniciar login com ${provider}:`, error);
  }
}