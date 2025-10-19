import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard"); // ou qualquer página inicial do seu app
}
