import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function WelcomeBanner({ name }) {
	return (
		<Alert>
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>
				Welcome! <span className="capitalize">{name}</span>
			</AlertTitle>
			<AlertDescription>
				Manage your cash flow with ease. Add new entries and view your financial history below.
			</AlertDescription>
		</Alert>
	);
}
