import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { ToggleTheme } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";

// app/(auth)/reset-password/layout.tsx
export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative">
      <Button variant={"link"} className="absolute top-5 left-5">
        <Link href="/sign-in" className="text-text flex items-center">
          <IoArrowBackOutline size={20} className="inline mr-2" />
          Voltar para o site
        </Link>
      </Button>
      <ToggleTheme className="absolute top-5 right-5" />
      {children}
    </main>
  );
}
