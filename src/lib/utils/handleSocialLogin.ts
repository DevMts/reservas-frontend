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
    await authClient.signIn.social({
      provider: provider,
      callbackURL: callbackURL,
    });
  } catch (error) {
    console.error(`Erro ao iniciar login com ${provider}:`, error);
  }
}