"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const jakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	display: "swap",
});

export default function Congratulations() {
	const router = useRouter();
	const [show, setShow] = useState(true);

	useEffect(() => {
		// 4s para manter na tela, depois dispara exit
		const timer = setTimeout(() => {
			setShow(false);
		}, 4000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<AnimatePresence
			onExitComplete={() => {
				// Só dispara quando a animação de exit terminar
				router.push("/dashboard");
			}}
		>
			{show && (
				<motion.article
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{
						opacity: 0,
						y: 50,
						transition: { duration: 0.8, ease: "easeInOut" },
					}}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="flex flex-col items-center justify-center text-center"
				>
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className={`${jakarta.className} text-5xl text-text`}
					>
						Bem vindo ao{" "}
						<span className="text-primary font-semibold">Reservas</span>!
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className={`${jakarta.className} text-5xl text-text mt-2`}
					>
						Sua jornada começa agora!
					</motion.p>

					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.6, duration: 0.5 }}
					>
						<Spinner className="mt-8 size-28" />
					</motion.div>
				</motion.article>
			)}
		</AnimatePresence>
	);
}
