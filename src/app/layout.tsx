import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { UserProvider } from "@/context/user-context";
import { getUserId } from "@/lib/get-id";
import { Providers } from "./providers";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getUserId();

	return (
		<html lang="pt" suppressHydrationWarning>
			<body className="bg-background text-foreground transition-colors duration-300">
				<Providers>
					<UserProvider userId={user}>{children}</UserProvider>
				</Providers>
				<Toaster position="top-center" />
			</body>
		</html>
	);
}
