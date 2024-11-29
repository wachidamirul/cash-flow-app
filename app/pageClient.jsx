"use client";

import Balance from "@/components/Balance";
import { FlowForm } from "@/components/cashflow/FlowForm";
import { FlowTable } from "@/components/cashflow/FlowTable";
import Expenses from "@/components/Expenses";
import Income from "@/components/Income";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const PageClient = () => {
	const { data: session } = useSession();
	const user = session?.user;

	return (
		<div className="relative">
			<div className="container mx-auto">
				<div className="mt-36 mx-8 space-y-12">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						<Balance />
						<Income />
						<Expenses />
					</div>
					<div className="space-y-6">
						<div className="flex items-center justify-end">
							<FlowForm />
						</div>

						<Card>
							<CardContent className="pt-6">
								<FlowTable />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			<div className="fixed top-4 right-4">
				<Button onClick={() => signOut()} variant="destructive" size="icon" className="rounded-full">
					<LogOut />
				</Button>
			</div>
		</div>
	);
};

export default PageClient;
