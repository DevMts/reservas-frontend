"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ToggleTheme } from "@/components/toggle-theme";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <main
      className={` ${
        !isSignIn && "flex-row-reverse"
      } relative flex justify-center items-center  mx-auto min-h-[100dvh]  bg-background overflow-hidden`}
    >
      <ToggleTheme className={"absolute top-5 right-5 z-11"} />
      {/* Formulários */}
      <section className="flex-1 flex justify-center items-center z-0 min-w-22">
        {children}
      </section>

      {/* Imagem deslizando à frente */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 z-10 rounded-2xl hidden lg:flex"
        animate={{ x: isSignIn ? 300 : -300 }} // ajuste conforme a distância que quer
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <Image
          alt="Casa decorativa"
          src="/images/house.webp"
          width={640}
          height={704}
          className="rounded-2xl"
        />
      </motion.div>
      <section className="h-[704px] w-160 hidden lg:flex"></section>
    </main>
  );
}
