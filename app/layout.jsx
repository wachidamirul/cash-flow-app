"use client";

import { JetBrains_Mono as JetBrainsMono, Plus_Jakarta_Sans as PlusJakartaSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const jetbrainsMono = JetBrainsMono({
	subsets: ["latin"],
	variable: "--font-mono"
});

const plusJakartaSans = PlusJakartaSans({
	subsets: ["latin"],
	variable: "--font-sans"
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={cn("font-sans antialiased", [plusJakartaSans.variable, jetbrainsMono.variable])}>
				<SessionProvider>
					{children}
					<Toaster position="top-right" richColors />
				</SessionProvider>
			</body>
		</html>
	);
}
