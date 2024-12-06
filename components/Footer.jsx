import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t">
			<div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
				<div className="text-sm text-muted-foreground mb-4 sm:mb-0">
					<p>© 2024 Cash Flow App.</p>
				</div>
				<div className="flex items-center space-x-4">
					<Link
						href="https://github.com/wachidamirul/cash-flow-app"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-primary transition-colors">
						<Github className="h-6 w-6" /> Github Source Code
						<span className="sr-only">GitHub repository</span>
					</Link>
				</div>
			</div>
		</footer>
	);
}
