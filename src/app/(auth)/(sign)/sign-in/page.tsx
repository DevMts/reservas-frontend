"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lato, Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ⬅️ Adicione esta linha
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa6";
import z from "zod";
import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth";
import {
  handleSignInSocial,
  SocialProvider,
} from "@/lib/utils/handleSocialLogin";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const signInSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

type signInType = z.infer<typeof signInSchema>;

export default function SingIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<signInType>({
    resolver: zodResolver(signInSchema),
  });

  async function handleSignIn(data: signInType) {
    try {
      const response = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "http://localhost:3000/dates",
      });

      if (response.error?.code === "INVALID_EMAIL_OR_PASSWORD") {
        setError("email", { message: "Campo inválido" });
        setError("password", { message: "Campo inválido" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignInWithGithub() {
    await handleSignInSocial({
      provider: SocialProvider.GITHUB,
      callbackURL: "http://localhost:3000/dates",
    });
  }

  async function handleSignInWithGoogle() {
    await handleSignInSocial({
      provider: SocialProvider.GOOGLE,
      callbackURL: "http://localhost:3000/dates",
    });
  }

  function forgetPassword(e: React.MouseEvent) {
    e.preventDefault();
    router.push("/reset-password");
  }
  return (
    <article>
      <div className="flex flex-col justify-center items-start gap-2.5">
        <Image src="/logo.svg" alt="Logo" width={54} height={47} />
        <h1 className={`${jakarta.className} text-4xl `}>
          Volte a alugar os <br />
          <span className="text-primary font-semibold">melhores</span> imóveis
        </h1>
      </div>
      <form className="mt-5" onSubmit={handleSubmit(handleSignIn)}>
        <div>
          <Label
            htmlFor="email"
            className={`${lato.className} mb-1.5 text-sm ${
              errors.email?.message && "text-red-400"
            }`}
          >
            Digite seu email
          </Label>
          <Input
            id="email"
            placeholder="seuemail@email.com"
            {...register("email")}
            className={`${errors.email?.message && "border border-red-400"}`}
          />
          <p className="text-red-400 text-sm text-right w-full block h-6 font-semibold">
            {errors.email?.message}
          </p>
        </div>
        <div>
          <Label
            htmlFor="password"
            className={`${lato.className} mb-1.5 text-sm ${
              errors.password?.message && "text-red-400"
            }}`}
          >
            Digite sua senha
          </Label>
          <PasswordInput
            id="password"
            {...register("password")}
            className={`
            ${errors.password?.message && "border border-red-400"}
            `}
          />
          <a
            href="/"
            className="text-black text-sm text-right  w-full flex justify-between flex-col"
          >
            <span className="text-red-400 text-sm font-semibold transition-all duration-200 block h-4">
              {errors.password?.message}
            </span>
            <div>
              <Button
                className="text-text"
                variant={"link"}
                onClick={forgetPassword}
                type="button"
              >
                Esqueceu sua senha?
              </Button>
            </div>
          </a>
        </div>
        <Button
          className="bg-primary w-full text-my-text font-semibold my-6"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>
      <div>
        <div className="flex items-center gap-2">
          <span className="flex-1 h-px bg-neutral-400"></span>
          <span className="text-neutral-400 text-sm">Ou entre com</span>
          <span className="flex-1 h-px bg-neutral-400"></span>
        </div>
        <div className="flex gap-1 mt-4.5">
          <Button
            variant={"outline"}
            className="border-my-text flex-1"
            onClick={handleSignInWithGoogle}
          >
            <Image
              src="./google.svg"
              alt="Logo do google"
              width={24}
              height={24}
            />
          </Button>
          <Button
            variant={"outline"}
            className="border-my-text flex-1"
            onClick={handleSignInWithGithub}
          >
            <FaGithub className="text-text" />
          </Button>
        </div>
      </div>
      <span className="text-center w-full block mt-4">
        <span className="text-my-text text-sm ">
          Não tem uma conta?
          <Link href="/sign-up">
            <span className="font-semibold "> &nbsp;&nbsp; Criar conta</span>
          </Link>
        </span>
      </span>
    </article>
  );
}
