import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Providers } from "./providers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="bg-background text-foreground transition-colors duration-300">
        <Providers>{children} </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
