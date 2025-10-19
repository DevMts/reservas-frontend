"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth";

const formSchema = z.object({
  email: z.email("Email inválido"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function ResetPasswordPage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  async function handleForgotPassword(data: FormSchema) {
    try {
      const response = await authClient.forgetPassword({
        email: data.email,
        redirectTo: "http://localhost:3000/reset-password/token",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex h-screen w-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Recupere sua senha</CardTitle>
          <CardDescription>
            Enviaremos um link de redefinição para seu email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleForgotPassword)}>
            <div className="mb-4 flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="w-50"
              />
              <span className="text-red-400 text-semibold">
                {errors.email?.message || ""}
              </span>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
