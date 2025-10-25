import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  console.log("ProtectedLayout session:", session);

  if (!session) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
