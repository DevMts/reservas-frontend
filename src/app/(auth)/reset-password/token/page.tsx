"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth";

const formSchema = z.object({
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function ResetPasswordTokenPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  async function handleResetPassword(data: FormSchema) {
    try {
      console.log(data, searchParams);
      const response = await authClient.resetPassword({
        token: searchParams.token,
        newPassword: data.password,
      });
      console.log(response);

      if (response.data) {
        alert("Senha redefinida com sucesso!");
        router.push("/sign-in");
      } else {
        alert("Erro ao redefinir senha. O link pode ter expirado.");
      }
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao tentar redefinir sua senha.");
    }
  }

  return (
    <section className="flex h-screen w-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Crie uma nova senha</CardTitle>
          <CardDescription>Digite sua nova senha abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleResetPassword)}>
            <div className="mb-4 flex flex-col gap-2">
              <Label htmlFor="password">Nova Senha</Label>
              <PasswordInput id="password" {...register("password")} />
              <span className="text-sm text-red-400">
                {errors.password?.message}
              </span>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Redefinindo..." : "Redefinir Senha"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
