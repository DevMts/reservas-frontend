"use client";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import { ToggleTheme } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function CompletePerfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <main className="relative h-screen flex bg-background flex-col items-center justify-center">
      {pathName !== "/congratulations" ? (
        <>
          <Button variant={"link"} className="absolute top-5 left-5">
            <Link href="/sign-in" className="text-text flex items-center">
              <IoArrowBackOutline size={20} className="inline mr-2" />
              Voltar para o site
            </Link>
          </Button>
          <ToggleTheme className="absolute top-5 right-5" />
          <section className="max-w-87 mx-auto mt-10 flex flex-col items-center justify-center">
            <h2 className={`${jakarta.className} text-text text-4xl`}>
              {pathName === "/address"
                ? "Agora insira seu endereço"
                : "Complete seu perfil"}
            </h2>
            <Progress
              value={pathName === "/address" ? 60 : 40}
              className="my-4"
            />
            {children}
          </section>
        </>
      ) : (
        <section>{children}</section>
      )}
    </main>
  );
}
