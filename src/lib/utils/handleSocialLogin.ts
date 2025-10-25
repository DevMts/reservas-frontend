import { authClient } from "../auth";

export enum SocialProvider {
  GITHUB = "github",
  GOOGLE = "google",
}
interface SocialLoginProps {
  provider: SocialProvider;
  callbackURL: string;
}

export async function handleSignInSocial({ provider, callbackURL }: SocialLoginProps) {
  try {
    const response = await authClient.signIn.social({
      provider: provider,
      callbackURL: callbackURL,
    });
    if (response.data?.url) {
      window.location.href = response.data.url;
    }
  } catch (error) {
    console.error(`Erro ao iniciar login com ${provider}:`, error);
  }
}