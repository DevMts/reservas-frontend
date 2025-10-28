import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { UserProvider } from "@/context/user-context";
import { getUser } from "@/lib/get-user";
import { Providers } from "./providers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const userId: string | null = user?.id;

  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="bg-background text-foreground transition-colors duration-300">
        <Providers>
          <UserProvider userId={userId}>{children}</UserProvider>
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
