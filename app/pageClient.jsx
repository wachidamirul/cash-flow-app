"use client";

import { useState, useEffect } from "react";
import Balance from "@/components/Balance";
import { AddTransaction } from "@/components/cashflow/AddTransaction";
import { FlowTable } from "@/components/cashflow/FlowTable";
import Expenses from "@/components/Expenses";
import Income from "@/components/Income";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

const PageClient = () => {
	const { data: session } = useSession();
	const userData = session?.user;

	const [isTransaction, setIsTransaction] = useState([]);
	const [dataFetched, setDataFetched] = useState(false);

	const fetchTransactions = async () => {
		if (!userData?.id || dataFetched) return;

		try {
			const url = new URL(`/api/transactions`, window.location.origin);
			url.searchParams.append("userId", userData.id);
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error("Failed to fetch transactions");
			}

			const result = await response.json();
			setIsTransaction(result.data || []);
			setDataFetched(true);
		} catch (error) {
			console.error("Error fetching transactions:", error);
			toast.error("Error", {
				description: "Error fetching transactions:"
			});
		}
	};

	const handleOnChange = async () => {
		try {
			setDataFetched(false);
			await fetchTransactions();
		} catch (error) {
			console.error("Error refreshing transactions:", error);
			toast.error("Error", {
				description: "Error refreshing transactions:"
			});
		}
	};

	useEffect(() => {
		if (session && !dataFetched) {
			fetchTransactions();
		}
	}, [session, dataFetched]);

	return (
		<div className="relative">
			<div className="container mx-auto">
				<div className="my-24 mx-8 space-y-12">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						<Balance data={isTransaction} />
						<Income data={isTransaction} />
						<Expenses data={isTransaction} />
					</div>
					<div className="space-y-6">
						<div className="flex items-center justify-end">
							<AddTransaction onAdd={handleOnChange} />
						</div>

						<Card>
							<CardContent className="pt-6">
								<FlowTable data={isTransaction} onDelete={handleOnChange} />
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
