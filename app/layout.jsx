import { JetBrains_Mono as JetBrainsMono, Plus_Jakarta_Sans as PlusJakartaSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const jetbrainsMono = JetBrainsMono({
	subsets: ["latin"],
	variable: "--font-mono"
});

const plusJakartaSans = PlusJakartaSans({
	subsets: ["latin"],
	variable: "--font-sans"
});

export const metadata = {
	title: "Cash Flow",
	description: "A simple cash flow app"
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={cn("font-sans antialiased", [plusJakartaSans.variable, jetbrainsMono.variable])}>
				{children}
			</body>
		</html>
	);
}
