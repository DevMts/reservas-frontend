"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lato, Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
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

const signUpSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

type signUpType = z.infer<typeof signUpSchema>;

export default function SingUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<signUpType>({
    resolver: zodResolver(signUpSchema),
  });
  console.log(errors);
  async function handleSignUp(data: signUpType) {
    try {
      const response = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (response.error?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
        setError("email", { message: "Email já cadastrado" });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignInWithGithub() {
    await handleSignInSocial(SocialProvider.GITHUB);
  }

  async function handleSignInWithGoogle() {
    await handleSignInSocial(SocialProvider.GOOGLE);
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <div className="flex flex-col justify-center items-start gap-2.5">
        <Image src="/logo.svg" alt="Logo" width={54} height={47} />
        <h1 className={`${jakarta.className} text-4xl`}>
          Comece a alugar os <br />
          <span className="text-primary font-semibold">melhores</span> imóveis
        </h1>
      </div>
      <div className="mt-5">
        <div>
          <Label
            htmlFor="name"
            className={`${lato.className} mb-1.5 text-sm ${
              errors.name?.message && "text-red-400"
            }`}
          >
            Digite seu nome
          </Label>
          <Input
            id="name"
            {...register("name")}
            className={`${errors.name?.message && "border border-red-400"}`}
          />
          <p className="text-red-400 text-sm font-semibold text-right w-full block h-6">
            {errors.name?.message}
          </p>
        </div>
        <div>
          <Label
            htmlFor="email"
            className={`${lato.className} ${
              errors.email?.message && "text-red-400"
            } mb-1.5 text-sm`}
          >
            Digite seu email
          </Label>
          <Input
            id="email"
            placeholder="seuemail@email.com"
            {...register("email")}
            className={`${errors.email?.message && "border border-red-400"}`}
          />
          <p className="text-red-400 text-sm font-semibold text-right w-full block h-6">
            {errors.email?.message}
          </p>
        </div>
        <div>
          <Label
            htmlFor="password"
            className={`${lato.className} mb-1.5 text-sm ${
              errors.password?.message && "text-red-400"
            }`}
          >
            Digite sua senha
          </Label>
          <PasswordInput
            id="password"
            {...register("password")}
            className={`${errors.password?.message && "border border-red-400"}`}
          />
          <p className="text-red-400 text-sm font-semibold text-right w-full block h-6">
            {errors.password?.message}
          </p>
        </div>
        <Button
          className="bg-primary w-full text-my-text font-semibold my-2"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Criando conta..." : "Criar conta"}
        </Button>
      </div>
      <div className="w-full mt-2">
        <div className="flex items-center gap-2 ">
          <span className="flex-1 h-px bg-neutral-400"></span>
          <span className="text-neutral-400 text-sm">Ou crie com</span>
          <span className="flex-1 h-px bg-neutral-400"></span>
        </div>
        <div className="flex gap-1 mt-4.5">
          <Button
            variant={"outline"}
            className="border-my-text flex-1"
            onClick={handleSignInWithGoogle}
            type="button"
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
            type="button"
          >
            <FaGithub size={24} />
          </Button>
        </div>
      </div>
      <span className="text-center w-full block mt-4">
        <span className="text-my-text text-sm">
          Já tem uma conta?
          <Link href="/sign-in">
            <span className="font-semibold "> Entrar</span>
          </Link>
        </span>
      </span>
    </form>
  );
}
