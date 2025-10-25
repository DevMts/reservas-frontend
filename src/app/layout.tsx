import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      {/* 👈 Evita piscadas ao trocar o tema */}
      <body className="bg-background text-foreground transition-colors duration-300">
        {/* 👆 Mantém o fundo e o texto sincronizados com o tema */}
        <Providers>{children}</Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
