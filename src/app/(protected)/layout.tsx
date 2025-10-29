export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";
import { UserProvider } from "@/context/user-context";
import { getUser } from "@/lib/get-user";
import { getSession } from "@/lib/session";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = await getUser();

  if (!session || !user) redirect("/sign-in");
  if (user?.completed_profile === false) redirect("/dates");

  return <UserProvider userId={user.id}>{children}</UserProvider>;
}
