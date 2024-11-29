"use client";

import Balance from "@/components/Balance";
import Expenses from "@/components/Expenses";
import Income from "@/components/Income";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const PageClient = () => {
	return (
		<div className="relative">
			<div className="container mx-auto mt-36">
				<div className="grid grid-cols-3 gap-12">
					<Balance />
					<Income />
					<Expenses />
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
